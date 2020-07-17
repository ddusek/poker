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
    else:
        player.is_in_game = True
        player.save()
    return player.id


@database_sync_to_async
def disconnect_player(player_id):
    """set player is_in_game to false
    """
    player = Player.objects.filter(id=player_id).first()
    if player is not None:
        player.is_in_game = False
        player.save()


def init_game(game, players):
    """Init game so the game can start properly.

    :param game: game to init
    :param players: players in the game
    """
    game_object = Game.objects.filter(id=game.id).first()
    first_player = min(player.id for player in players)
    game_object.current_player = first_player
    game_object.game_initialized = True
    game_object.save()


@database_sync_to_async
def start_game(game):
    """Start game if enough players joined the game

    :param game: Game object
    :return: true or false
    """
    players = Player.objects.filter(game=game, is_in_game=True)
    if len(players) > 1:
        if not game.game_initialized:
            # Init game here so no more db request or method returns are needed
            init_game(game, players)
        return True
    return False


