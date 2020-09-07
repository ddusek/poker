import math
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from game.serializers import *
from game.utils import make_path
from . import player_helper, game_helper


class GameDetailView(APIView):
    """Game detail view.
    """
    def get(self, request):
        """Get game from query string.
        """
        game_name = request.GET.get('game', '')
        if game_name == '':
            return Response('didnt get parameter "game"', status=status.HTTP_400_BAD_REQUEST)
        game = Game.objects.filter(name=game_name).first()
        if game is None:
            return Response('game not found', status=status.HTTP_400_BAD_REQUEST)
        return Response(GameSerializer(game).data, status=status.HTTP_200_OK)

    def post(self, request):
        """Initialize game object based on query string.

        Also create cards for the game.

        """
        if 'players' not in request.data['body'] or 'chips' not in request.data['body']:
            res = {'status': 400, 'msg': 'didnt receive data'}
            return Response(res, status=status.HTTP_400_BAD_REQUEST)
        path, name = make_path('/game/', Game)
        players = int(request.data['body']['players'])
        chips = int(request.data['body']['chips'])
        big_blind = math.ceil(chips / 100)
        small_blind = math.ceil(big_blind / 2)
        # create game
        Game.objects.create(path=path, big_blind=big_blind, small_blind=small_blind,
                            name=name, max_players=players, starting_chips=chips)

        res = {'status': 200, 'msg': 'success', 'path': path}
        return Response(res, status=status.HTTP_200_OK)


class PlayerDetailView(APIView):
    """Player detail view.
    """
    def get(self, request):
        """Get player from user in session and save player to session.
        """
        if 'user_id' not in request.session:
            return Response('user not logged in', status=status.HTTP_401_UNAUTHORIZED)

        game_name = request.GET.get('game', '')
        if game_name == '':
            return Response('game parameter not found', status=status.HTTP_400_BAD_REQUEST)

        game = Game.objects.filter(name=game_name).first()
        if game is None:
            return Response('game from parameter not found', status=status.HTTP_400_BAD_REQUEST)

        player = Player.objects.filter(user=request.session['user_id'], game=game).first()
        if player is None:
            return Response('player not found', status=status.HTTP_400_BAD_REQUEST)

        player_serialized = PlayerSerializer(player).data
        # save player_id to session
        request.session[f'{game_name}_player_id'] = player_serialized['id']
        return Response(player_serialized, status=status.HTTP_200_OK)


class PlayersDetailsView(APIView):
    """list of players view.
    """
    def get(self, request):
        """Get players from given game in query string.
        """
        game_name = request.GET.get('game', '')
        if game_name == '':
            return Response('game parameter not found', status=status.HTTP_400_BAD_REQUEST)

        game = Game.objects.filter(name=game_name).first()
        if game is None:
            return Response('game from parameter not found', status=status.HTTP_400_BAD_REQUEST)

        players = Player.objects.filter(game=game, is_in_game=True)
        if players is None:
            return Response('players not found', status=status.HTTP_400_BAD_REQUEST)

        players_serialized = PlayerSerializer(players, many=True).data
        return Response(players_serialized, status=status.HTTP_200_OK)


class PlayerRaiseView(APIView):
    """Raise action view.
    """
    def post(self, request):
        """Raise given number of chips from request.
        """
        game_name = request.data['body']['game']
        if game_name == '':
            return Response('didnt get game_name', status=status.HTTP_400_BAD_REQUEST)
        player_id = request.session[f'{game_name}_player_id']
        if player_id is None:
            return Response('didnt get player_id', status=status.HTTP_400_BAD_REQUEST)
        chips = int(request.data['body']['value'])
        if chips == 0 or chips is None:
            return Response('chips was None or 0', status=status.HTTP_400_BAD_REQUEST)

        player = Player.objects.filter(id=player_id).first()
        if player is None:
            return Response('player not found', status=status.HTTP_400_BAD_REQUEST)
        player_helper.raize(player, chips)
        game_helper.check_next_round(game_name)

        return Response('raised successfully', status=status.HTTP_200_OK)


class PlayerCallView(APIView):
    """Raise action view.
    """
    def post(self, request):
        """Raise given number of chips from request.
        """
        game_name = request.data['body']['game']
        if game_name == '':
            return Response('didnt get game_name', status=status.HTTP_400_BAD_REQUEST)
        player_id = request.session[f'{game_name}_player_id']
        if player_id is None:
            return Response('didnt get player_id', status=status.HTTP_400_BAD_REQUEST)
        chips = int(request.data['body']['value'])
        if chips == 0 or chips is None:
            return Response('chips was None or 0', status=status.HTTP_400_BAD_REQUEST)

        player = Player.objects.filter(id=player_id).first()
        if player is None:
            return Response('player not found', status=status.HTTP_400_BAD_REQUEST)
        player_helper.call(player, chips)
        game_helper.check_next_round(game_name)

        return Response('raised successfully', status=status.HTTP_200_OK)


class PlayerCheckView(APIView):
    """Raise action view.
    """
    def post(self, request):
        """Raise given number of chips from request.
        """
        game_name = request.data['body']['game']
        if game_name == '':
            return Response('didnt get game_name', status=status.HTTP_400_BAD_REQUEST)
        player_id = request.session[f'{game_name}_player_id']
        if player_id is None:
            return Response('didnt get player_id', status=status.HTTP_400_BAD_REQUEST)
        chips = int(request.data['body']['value'])
        if chips == 0 or chips is None:
            return Response('chips was None or 0', status=status.HTTP_400_BAD_REQUEST)

        player = Player.objects.filter(id=player_id).first()
        if player is None:
            return Response('player not found', status=status.HTTP_400_BAD_REQUEST)
        player_helper.check()
        game_helper.check_next_round(game_name)

        return Response('raised successfully', status=status.HTTP_200_OK)


class PlayerAllInView(APIView):
    """Raise action view.
    """
    def post(self, request):
        """Raise given number of chips from request.
        """
        game_name = request.data['body']['game']
        if game_name == '':
            return Response('didnt get game_name', status=status.HTTP_400_BAD_REQUEST)
        player_id = request.session[f'{game_name}_player_id']
        if player_id is None:
            return Response('didnt get player_id', status=status.HTTP_400_BAD_REQUEST)
        chips = int(request.data['body']['value'])
        if chips == 0 or chips is None:
            return Response('chips was None or 0', status=status.HTTP_400_BAD_REQUEST)

        player = Player.objects.filter(id=player_id).first()
        if player is None:
            return Response('player not found', status=status.HTTP_400_BAD_REQUEST)
        player_helper.all_in(player, chips)
        game_helper.check_next_round(game_name)

        return Response('raised successfully', status=status.HTTP_200_OK)


class PlayerFoldView(APIView):
    """Call action view.
    """
    def post(self, request):
        """Call highest raise in game.
        """
        game_name = request.data['body']['game']
        if game_name == '':
            return Response('didnt get game_name', status=status.HTTP_400_BAD_REQUEST)
        player_id = request.session[f'{game_name}_player_id']
        if player_id is None:
            return Response('didnt get player_id', status=status.HTTP_400_BAD_REQUEST)
        game = Game.objects.filter(name=game_name).first()
        if game is None:
            return Response('game not found', status=status.HTTP_400_BAD_REQUEST)
        player = Player.objects.filter(id=player_id).first()
        if player is None:
            return Response('player not found', status=status.HTTP_400_BAD_REQUEST)
        player_helper.fold(player)
        game_helper.check_next_round(game_name)

        return Response('call action success', status=status.HTTP_200_OK)


class PlayerActionsView(APIView):
    """Player allowed actions.
    """
    def get(self, request):
        """Get player allowed actions.
        """
        game_name = request.GET.get('game', '')
        if game_name == '':
            return Response('didnt get game_name', status=status.HTTP_400_BAD_REQUEST)
        player_id = request.session[f'{game_name}_player_id']
        if player_id is None:
            return Response('didnt get player_id', status=status.HTTP_400_BAD_REQUEST)
        game = Game.objects.filter(name=game_name).first()
        if game is None:
            return Response('game not found', status=status.HTTP_400_BAD_REQUEST)
        player = Player.objects.filter(id=player_id).first()
        if player is None:
            return Response('player not found', status=status.HTTP_400_BAD_REQUEST)
        player = player_helper.set_allowed_actions(game, player)
        player.save()
        return Response(PlayerSerializer(player).data, status=status.HTTP_200_OK)


class CardsDetailView(APIView):
    """Player cards detail view.
    """
    def get(self, request):
        """Get cards from session by player_id
        """
        game_name = request.GET.get('game', '')
        if game_name == '':
            return Response('game from parameter not found', status=status.HTTP_400_BAD_REQUEST)

        if f'{game_name}_player_id' not in request.session:
            return Response('cant get cards, didnt find player_id in session', status.HTTP_401_UNAUTHORIZED)
        cards = Card.objects.filter(player=request.session[f'{game_name}_player_id'])

        if not cards:
            return Response('didnt find any cards for player', status.HTTP_400_BAD_REQUEST)
        return Response(CardSerializer(cards, many=True).data, status=status.HTTP_200_OK)


class TableCardsDetailView(APIView):
    """Table cards detail view.
    """
    def get(self, request):
        """Get table cards from game.
        """
        game_name = request.GET.get('game', '')
        if game_name == '':
            return Response('game from parameter not found', status=status.HTTP_400_BAD_REQUEST)

        game = Game.objects.filter(name=game_name).first()
        if game is None:
            return Response('game not found', status=status.HTTP_400_BAD_REQUEST)

        cards = Card.objects.filter(game=game, location='TABLE')

        if not cards:
            return Response('didnt find any cards in game', status.HTTP_204_NO_CONTENT)
        return Response(CardSerializer(cards, many=True).data, status=status.HTTP_200_OK)
