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


def next_player(game):
    if game is None:
        print('error, game not found')
        return None
    players = Player.objects.filter(game=game, is_in_game=True).order_by('in_game_order')
    current_player = players.filter(id=game.current_player)
    if game.current_player >= game.players_connected:
        game.current_player = players[0].id
    else:
        game.current_player = players.index([p for p in players if p.in_game_order > current_player.in_game_order][0].id)
        if game.current_player is None:
            print('error, new current player with higher in_game_order not found')
            return None
    return game


def new_bet(game, value, biggest_bet):
    """Add bet to the game.

    :return: updated game
    """
    print(game.pot, value)
    game.pot += value
    if game.last_raise < value:
        game.last_raise = value
    if game.biggest_bet < biggest_bet:
        game.biggest_bet = biggest_bet
    return game
