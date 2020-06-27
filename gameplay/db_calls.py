from channels.db import database_sync_to_async

from api.models import Game
from api.serializers import GameSerializer
from user.models import User
from user.serializers import UserSerializer


@database_sync_to_async
def get_user(user_id):
    if user_id is None:
        return 'user not logged in'
    return UserSerializer(User.objects.filter(id=user_id).first()).data


@database_sync_to_async
def get_game(game_path):
    if game_path is None:
        return 'no slug received'
    return GameSerializer(Game.objects.filter(path=game_path).first()).data
