import json
from channels.generic.websocket import AsyncWebsocketConsumer
from gameplay.db_calls import get_user


def get_parameter_value(parameters, key):
    found = [par for par in parameters if key in par]
    found = found[0] if len(found) > 0 else None
    return found[found.find('=')+1:] if found is not None else None


class GameConsumer(AsyncWebsocketConsumer):
    async def websocket_connect(self, event):
        await self.accept()
        self.game_name = self.scope['url_route']['kwargs']['game_name']
        self.game_group_name = 'game_%s' % self.game_name
        self.query_string = self.scope['query_string'].decode('utf-8').split('&')
        print(self.query_string)
        # Join game group
        await self.channel_layer.group_add(
            self.game_group_name,
            self.channel_name
        )

        await self.channel_layer.group_send(
            self.game_group_name,
            {
                'type': 'message_connected',
                'message': self.query_string,
                'user': str(await get_user(get_parameter_value(self.query_string, 'users')))
            }
        )

    async def websocket_disconnect(self, event):
        # Leave game group
        await self.channel_layer.group_discard(
            self.game_group_name,
            self.channel_name
        )

    async def websocket_receive(self, event):
        text_data_json = json.loads(event['text'])
        message = text_data_json['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.game_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, message):
        message = message['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

    # Receive message from room group
    async def message_connected(self, message):
        msg = message['message']
        user = message['user']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'type': 'message_connected',
            'message': msg,
            'user': user
        }))

