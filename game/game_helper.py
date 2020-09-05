from channels.db import database_sync_to_async
from game.models import Game
from game.models import Player


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


@database_sync_to_async
def next_player(game):
    """Set current player to the next one.

    :return: updated game object
    """
    if game is None:
        print('error, game not found')
        return
    players = Player.objects.filter(game=game, is_in_game=True).order_by('in_game_order')
    current_player = players.filter(id=game.current_player).first()
    if game.current_player >= players.last().id:
        # Current player is sometimes same as the first one, so choose second one insted if that happens
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
        if game.small_blind_player == game.current_player:
            game.all_played = True
    if game.all_played:
        players = Player.objects.filter(game=game)
        game = bets_are_same(game, players)
        if game.round_ended:
            game = start_next_round(game, players)
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
    game.current_player = game.big_blind_player
    game.last_raise = 0
    game.biggest_bet = 0
    game.rounds_played += 1
    game.round_ended = False
    game.all_played = False

    for player in players:
        player.pot += player.round_bet
        player.round_bet = 0
        player.save()
    return game
