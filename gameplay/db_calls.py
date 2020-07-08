from channels.db import database_sync_to_async
from game.models import Game, Player
from game.serializers import GameSerializer
from user.models import User


@database_sync_to_async
def get_user(user_id):
    if user_id is None:
        return 'user not logged in'
    return User.objects.filter(id=user_id).first()


@database_sync_to_async
def get_game(game_path):
    if game_path is None:
        return 'no slug received'
    game_path = game_path[0:-1] if game_path[-1] == '/' else game_path
    return Game.objects.filter(path=game_path).first()


# Create player if not created yet and return him
@database_sync_to_async
def create_player(user, game):
    player = Player.objects.filter(user=user, game=game).first()
    if player is None:
        player = Player(user=user, game=game, chips=GameSerializer(game).data['starting_chips'], is_in_game=True)
        player.save()
    return player


@database_sync_to_async
def start_game(game):
    if len(Player.objects.filter(game=game, is_in_game=True)) > 1:
        return True
    return False
