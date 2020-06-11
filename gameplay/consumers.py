import asyncio
import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth import get_user_model
from channels.consumer import AsyncConsumer
from channels.db import database_sync_to_async


# class GameplayConsumer(AsyncConsumer):
#     async def websocket_connect(self, event):
#         print('connected', event)
#
#     async def websocket_receive(self, event):
#         print('receive', event)
#
#     async def websocket_disconnect(self, event):
#         print('disconnect', event)


class GameConsumer(WebsocketConsumer):
    def connect(self):
        self.game_name = self.scope['url_route']['kwargs']['game_name']
        self.game_group_name = 'game_%s' % self.game_name

        # Join game group
        async_to_sync(self.channel_layer.group_add)(
            self.game_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        # Leave game group
        async_to_sync(self.channel_layer.group_discard)(
            self.game_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.game_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )
