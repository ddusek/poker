from channels.db import database_sync_to_async
from game.models import Game, Player
from game.serializers import GameSerializer
from user.models import User


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
def create_player(user, game):
    """Create and return player.

    :param user: user who will be related to player
    :param game: game what will be related to player
    :return: Player object (even if he was already created)
    """
    player = Player.objects.filter(user=user, game=game).first()
    if player is None:
        player = Player(user=user, game=game, chips=GameSerializer(game).data['starting_chips'], is_in_game=True)
        player.save()
    return player


@database_sync_to_async
def start_game(game):
    """Start game if enough players joined the game

    :param game: Game object
    :return: true or false
    """
    if len(Player.objects.filter(game=game, is_in_game=True)) > 1:
        return True
    return False
