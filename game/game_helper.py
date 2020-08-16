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
        game.current_player = players.first().id
    else:
        game.current_player = players.filter(id=[p for p in players if p.in_game_order
                                                 > current_player.in_game_order][0].id).first().id
        if game.current_player is None:
            print('error, new current player with higher in_game_order not found')
            return
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
