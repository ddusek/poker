import json
from channels.generic.websocket import AsyncWebsocketConsumer

# class GameplayConsumer(AsyncConsumer):
#     async def websocket_connect(self, event):
#         print('connected', event)
#
#     async def websocket_receive(self, event):
#         print('receive', event)
#
#     async def websocket_disconnect(self, event):
#         print('disconnect', event)


class GameConsumer(AsyncWebsocketConsumer):
    async def websocket_connect(self, event):
        self.game_name = self.scope['url_route']['kwargs']['game_name']
        self.game_group_name = 'game_%s' % self.game_name

        # Join game group
        await self.channel_layer.group_add(
            self.game_group_name,
            self.channel_name
        )
        await self.accept()

    async def wesocket_disconnect(self, event):
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
