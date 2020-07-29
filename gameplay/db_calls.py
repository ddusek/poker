from channels.db import database_sync_to_async
from game.models import Game, Player
from game.serializers import GameSerializer
from user.models import User
from .utils import *
from .actions import *


@database_sync_to_async
def get_user(user_id):
    """Get user from database by user_id.

    :param user_id: id of user to get
    :return: User object if found
    """
    if user_id is None:
        return 'user not logged in'
    return User.objects.filter(id=user_id).first()


@database_sync_to_async
def get_game(game_path):
    """Get game from database by game_path

    :param game_path: game path to find game by
    :return: Game object if found
    """
    if game_path is None:
        return 'no slug received'
    game_path = game_path[0:-1] if game_path[-1] == '/' else game_path
    return Game.objects.filter(path=game_path).first()


@database_sync_to_async
def create_player(user, game, players):
    """Create and return player.

    only return player if he is already created
    :param user: user who will be related to player
    :param game: game what will be related to player
    :return: Player object
    """
    players = players.order_by('in_game_order')
    print(players)
    player = players.filter(user=user).first()
    if player is None:
        player = Player(user=user, game=game, chips=GameSerializer(game).data['starting_chips'], is_in_game=True)
    else:
        player.is_in_game = True

    # set player in_game_order
    if len(players) < 1:
        player.in_game_order = 1
    else:
        player.in_game_order = players.reverse()[0].in_game_order + 1

    player.save()
    return player.id


@database_sync_to_async
def disconnect_player(player_id, game_name):
    """set player is_in_game to false and adjust other players order
    """
    game = Game.objects.filter(name=game_name).first()
    players = Player.objects.filter(game=game)
    player = players.filter(id=player_id).first()
    if player is not None:
        adjust_orders(player, players)
        player.is_in_game = False
        player.save()


@database_sync_to_async
def init_game(game, players):
    """Init game if enough players joined the game

    :return: true or false
    """
    if len(players) > 1:
        if not game.game_initialized:
            # Init game table
            init_game_model(game, players)
        return True
    return False


@database_sync_to_async
def start_first_round(game, players):
    """start first round of a game
    """
    set_blinds(game, players)
    game.game_in_progress = True
    game.save()
