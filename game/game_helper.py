from game.models import Game


def init_game(game, players):
    """Init game so the game can start properly.

    :param game: game to init
    :param players: players in the game
    """
    if len(players) < 2:
        # dont init game if there is lesser than 2 players
        return
    players = sorted(players, key=lambda i: i.in_game_order)
    game_object = Game.objects.filter(id=game.id).first()
    game_object.big_blind_player = players[-1].id
    game_object.small_blind_player = players[0].id
    game_object.current_player = players[0].id
    game_object.game_initialized = True
    game_object.save()
