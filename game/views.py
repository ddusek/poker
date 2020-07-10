import math
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from game.serializers import *
from game.utils import make_path
from gameplay_utils.deck import Deck


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
        game = Game.objects.create(path=path, big_blind=big_blind, small_blind=small_blind,
                                   name=name, max_players=players, starting_chips=chips)

        # create cards
        deck = Deck()
        for card in deck.set:
            Card.objects.create(game=game, suit=card.suit, rank=card.rank,
                                value=card.value, image=card.image)

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
