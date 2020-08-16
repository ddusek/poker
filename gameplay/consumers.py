from channels.generic.websocket import AsyncJsonWebsocketConsumer
from gameplay.db_calls import *
from user.serializers import UserSerializer


def get_parameter_value(parameters, key):
    """Get parameter from query string parameters list by a key.

    :param parameters: list of parameters
    :param key: key to find in parameter
    :return: value of key if found
    """
    found = [par for par in parameters if key in par]
    found = found[0] if len(found) > 0 else None
    return found[found.find('=') + 1:] if found is not None else None


class GameConsumer(AsyncJsonWebsocketConsumer):
    """Gameplay websocket.

    All gameplay related stuff that cant be done through http is done here.

    Websocket here is needed because player needs to get data from other players in real-time.
    """
    async def connect(self):
        """Join game room by url, get stuff from db and create player.

        Saves some data from url and query strings then gets data from database based on that.
        Create player for current user and game if not created yet.
        """
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

        players_all = await get_players(game)

        # create player from user if he is not created for this specific game yet.
        # if he is, set is_in_game to true
        self.player_id = await create_player(user, game, players_all)

        # get players currently in game
        players_in_game = await  get_players(game, True)

        # create connect_data object for websocket message
        self.connect_data = {}

        # create game if its not created yet
        if await init_game(game, players_in_game):
            if not game.game_in_progress:
                game = await get_game_by_id(game.id)
                await start_first_round(game, players_in_game)

            self.connect_data['start_game'] = True

        else:
            self.connect_data['start_game'] = False

        self.connect_data['user'] = UserSerializer(user).data['id']
        self.connect_data['game'] = GameSerializer(game).data['id']
        self.connect_data['type'] = 'player_connected'

        await self.channel_layer.group_send(self.game_group_name, self.connect_data)

    async def disconnect(self, code):
        """Disconnect player from room.

        set player is_in_game to false and adjust in_game_order for other players.
        """
        await disconnect_player(self.player_id, self.game_name)
        self.data = {
            "type": 'player_disconnected'
        }
        await self.channel_layer.group_send(self.game_group_name, self.data)

        # Leave game group
        await self.channel_layer.group_discard(self.game_group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        """Send message to room after its received.

        which message type to send is determined by dictionary key `type`.

        :param content: dictionary containing message data
        """

        # Send message to room group
        await self.channel_layer.group_send(self.game_group_name, content)

    async def player_connected(self, message):
        """Message sent after someone connects.
        """
        # Send message to WebSocket
        await self.send_json(content=message)

    async def player_disconnected(self, message):
        """Message sent after someone disconnects.
        """
        await self.send_json(content=message)

    async def player_action(self, message):
        """Message sent after player do some action.
        """
        game = await get_game_by_name(self.game_name)
        await game_helper.next_player(game)
        message['current_player'] = await get_current_player(self.game_name)
        await self.send_json(content=message)
