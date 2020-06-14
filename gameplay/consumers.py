import json
from importlib import import_module

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from poker_app import settings

SessionStore = import_module(settings.SESSION_ENGINE).SessionStore
from gameplay.db_calls import get_user


class GameConsumer(AsyncWebsocketConsumer):
    async def websocket_connect(self, event):
        await self.accept()
        self.game_name = self.scope['url_route']['kwargs']['game_name']
        self.game_group_name = 'game_%s' % self.game_name
        s = SessionStore()
        print(s.session_key)
        print(self.scope['headers'])
        # Join game group
        await self.channel_layer.group_add(
            self.game_group_name,
            self.channel_name
        )

        await self.channel_layer.group_send(
            self.game_group_name,
            {
                'type': 'message_connected',
                'message': 'someone just connected',
                'user': str(await get_user(1))
            }
        )

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
