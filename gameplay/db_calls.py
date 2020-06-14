from channels.db import database_sync_to_async

from user.models import User
from user.serializers import UserSerializer


@database_sync_to_async
def get_user(current_user_id):
    if current_user_id is None:
        return 'user not logged in'
    user = User.objects.filter(id=current_user_id).first()
    serializer = UserSerializer(user).data
    return serializer
