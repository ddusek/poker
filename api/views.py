import pdb

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, permissions, status
from api.serializers import *
from api.utils import make_path
from gameplay_utils.deck import Deck


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class PlayerViewSet(viewsets.ModelViewSet):
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class PlayerDetailView(APIView):
    def get(self, request, format=None, **kwargs):
        p = Player.objects.get(id=self.kwargs['pk'])
        g = Game.objects.get(id=self.kwargs['gameid'])
        player_serializer = PlayerDetailSerializer(p)
        game_serializer = GameSerializer()
        return Response({
            'game': game_serializer.data,
            'player': player_serializer.data,
        })


class GameCreateView(APIView):
    # init db game objects
    def post(self, request, format=None):
        if 'players' not in request.data['body'] or 'chips' not in request.data['body']:
            res = {'status': 400, 'msg': 'didnt receive data'}
            return Response(res, status=status.HTTP_400_BAD_REQUEST)
        path = make_path('/game/', Game)
        players = int(request.data['body']['players'])
        chips = int(request.data['body']['chips'])

        # create game
        game = Game.objects.create(path=path)

        # create players
        for i in range(players):
            Player.objects.create(game=game, chips=chips)

        # create cards
        deck = Deck()
        for card in deck.set:
            Card.objects.create(game=game, suit=card.suit, rank=card.rank)

        res = {'status': 200, 'msg': 'success', 'path': path}
        return Response(res, status=status.HTTP_200_OK)
