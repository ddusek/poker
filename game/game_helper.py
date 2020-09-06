from channels.db import database_sync_to_async
from gameplay_utils import combinations, deck
from game.models import Game
from game.models import Player
from . import card_helper, player_helper


def init_game(game, players):
    """Init game so the game can start properly.

    :param game: game to init
    :param players: players in the game
    """
    if len(players) < 2:
        # dont init game if there is lesser than 2 players
        return
    players = sorted(players, key=lambda i: i.in_game_order)
    updated_game = Game.objects.filter(id=game.id).first()
    updated_game.big_blind_player = players[-1].id
    updated_game.small_blind_player = players[0].id
    updated_game.current_player = players[0].id
    updated_game.game_initialized = True
    updated_game.save()


def prepare_next_game(game, players):
    """Clear game and prepare it for the next one.

    :param game: game to prepare
    :param players: players in the game
    """
    players = sorted(players, key=lambda i: i.in_game_order)

    bbp = next(player for player in players if player.id == game.big_blind_player)
    if bbp.id == players[-1].id:
        bbp = players[0]
    else:
        bbp_index = next(index for (index, player) in enumerate(players) if player.id == game.big_blind_player)
        bbp = players[bbp_index + 1]
    sbp = next(player for player in players if player.id == game.small_blind_player)
    if sbp.id == players[-1].id:
        sbp = players[0]
    else:
        sbp_index = next(index for (index, player) in enumerate(players) if player.id == game.small_blind_player)
        sbp = players[sbp_index + 1]

    game.big_blind_player = bbp.id
    game.small_blind_player = sbp.id
    game.current_player = sbp.id
    game.biggest_bet = game.big_blind
    game.last_raise = game.big_blind
    game.pot = 0
    game.rounds_played = 0
    game.round_ended = False
    game.game_over = False
    game.all_played = False

    updated_players = Player.objects.filter(game=game, is_in_game=True)
    player_helper.set_blinds(game, updated_players)

    card_helper.init_cards(game)
    card_helper.deal_cards(game, updated_players)

    game.save()


@database_sync_to_async
def next_player(game):
    """Set current player to the next one.

    :return: updated game object
    """
    if game is None:
        print('error, game not found')
        return
    if game.round_ended:
        game.round_ended = False
        game.save()
        return

    players = Player.objects.filter(game=game, is_in_game=True).order_by('in_game_order')
    current_player = players.filter(id=game.current_player).first()
    if game.current_player >= players.last().id:
        # Current player is sometimes bugged and is same as the first one, so choose second one insted if that happens
        game.current_player = players[1].id if players.first().id == game.current_player else players.first().id
    else:
        game.current_player = players.filter(id=[p for p in players if p.in_game_order
                                                 > current_player.in_game_order][0].id).first().id
        if game.current_player is None:
            print('error, new current player with higher in_game_order not found')
            return
    game.save()


def check_next_round(game_name):
    """Check if next round should start, if yes Start it.
    """
    game = Game.objects.filter(name=game_name).first()
    if not game.all_played:
        if game.big_blind_player == game.current_player:
            game.all_played = True
    if game.all_played:
        players = Player.objects.filter(game=game)
        game = bets_are_same(game, players)
        if game.round_ended:
            game = start_next_round(game, players)
        if game.game_over:
            give_rewards(game, players)
            prepare_next_game(game, players)
        game.save()


def new_bet(game, value, biggest_bet):
    """Add bet to the game.

    :return: updated game
    """
    game.pot += value
    if game.last_raise < value:
        game.last_raise = value
    if game.biggest_bet < biggest_bet:
        game.biggest_bet = biggest_bet
    return game


def bets_are_same(game, players):
    """Check if some players needs to call a bet.

    :return: bool
    """
    players = players.filter(is_folded=False, is_all_in=False, is_in_game=True)
    biggest_bet = max([p.round_bet for p in players])
    for player in players:
        if player.round_bet < biggest_bet:
            return game
    game.round_ended = True
    return game


def start_next_round(game, players):
    """Start next round of the game.

    :return: game object
    """
    pot = sum([p.round_bet for p in players])
    game.pot += pot
    player_helper.reset_round_bets(players)
    if game.rounds_played == 3:
        game.game_over = True
        return game

    game.last_raise = 0
    game.biggest_bet = 0
    game.current_player = game.small_blind_player
    game.rounds_played += 1
    game.all_played = False

    card_helper.deal_cards_table(game, 3 if game.rounds_played == 1 else 1)

    return game


def give_rewards(game, players):
    """Give game chips to the winner.
    """
    player_hands = []
    for player in players:
        player_hands.append({'player': player, 'cards': card_helper.get_player_cards(player)})

    winner = find_winner(player_hands)
    winner['player'].chips += game.pot
    game.pot = 0
    winner['player'].save()
    game.save()


def find_winner(player_hands):
    """Find player who has the best hand.
    """
    player_combinations = []
    for p_hand in player_hands:
        cards = []
        for card in p_hand['cards']:
            rank = deck.Rank(card.rank, card.value)
            cards.append(deck.Card(card.suit, rank))
        combination = combinations.Combinations(cards).highest_combination()
        player_combinations.append({'player': p_hand['player'], 'combination': combination})
    player_combinations = sorted(player_combinations, key=lambda k: k['combination'])
    # same_top_hands = [p_comb for p_comb in player_combinations
    #                   if p_comb['combination'] == player_combinations[0]['combination']]
    # if player_combinations[0]['combination']:
    #  TODO check highest cards/split rewards
    return player_combinations[0]
