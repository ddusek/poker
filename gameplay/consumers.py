from channels.generic.websocket import AsyncJsonWebsocketConsumer
from gameplay.db_calls import *
from user.serializers import UserSerializer
from api.serializers import PlayerDetailSerializer


def get_parameter_value(parameters, key):
    found = [par for par in parameters if key in par]
    found = found[0] if len(found) > 0 else None
    return found[found.find('=') + 1:] if found is not None else None


class GameConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()

        # make game name from url
        self.game_name = self.scope['url_route']['kwargs']['game_name']
        self.game_group_name = 'game_%s' % self.game_name

        # get query string
        self.query_string = self.scope['query_string'].decode('utf-8').split('&')

        # Join game group
        await self.channel_layer.group_add(
            self.game_group_name,
            self.channel_name
        )

        # get user and game from database by id from query strings
        user = await get_user(get_parameter_value(self.query_string, 'user'))
        game = await get_game(get_parameter_value(self.query_string, 'game'))

        # create player from user on connect if he is not created for this specific game yet
        await create_player(user, game)
        self.data = {}
        if await start_game(game):
            self.data['start_game'] = True
        else:
            self.data['start_game'] = False
        self.data['user'] = UserSerializer(user).data['id']
        # self.data['player'] = PlayerDetailSerializer(player).data['id']
        self.data['game'] = GameSerializer(game).data['id']
        self.data['type'] = 'user_connected'

        await self.channel_layer.group_send(self.game_group_name, self.data)

    async def disconnect(self, event):
        # Leave game group
        await self.channel_layer.group_discard(self.game_group_name, self.channel_name)

    async def receive_json(self, content, close=False):
        # Send message to room group
        await self.channel_layer.group_send(self.game_group_name, content)

    # Receive message from room group
    async def chat_message(self, message):
        # Send message to WebSocket
        await self.send_json(content=message)

    # Receive message from room group
    async def user_connected(self, message):
        # Send message to WebSocket
        await self.send_json(content=message)
