from game.models import Game
from django.db.models import F


def init_game(game, players):
    """Init game so the game can start properly.

    :param game: game to init
    :param players: players in the game
    """
    if len(players) < 2:
        # dont init game if there is lesser than 2 players
        return
    players = sorted(players, key=lambda i: i.id)
    game_object = Game.objects.filter(id=game.id).first()
    # game_object.current_player = players[1].id
    # game_object.big_blind_player = players[1] if len(players) > 2 else players[0]
    # game_object.small_blind_player = players[2] if len(players) > 2 else players[1]
    # game_object.game_initialized = True
    # game_object.save()


def adjust_orders(removed_player, players):
    """odjus orders of players according to removed_player

    :param removed_player: player to remove from order
    :param players: players to adjust
    """
    players.filter(in_game_order__gte=removed_player.in_game_order).update(in_game_order=F('in_game_order') - 1)
    removed_player.in_game_order = 0
    removed_player.save()
