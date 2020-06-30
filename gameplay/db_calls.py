from channels.db import database_sync_to_async
from api.models import Game, Player
from api.serializers import GameSerializer
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


@database_sync_to_async
def create_player(user, game):
    if Player.objects.filter(user=user, game=game).first() is None:
        Player.objects.create(user=user,
                              game=game,
                              chips=GameSerializer(game).data['starting_chips'])