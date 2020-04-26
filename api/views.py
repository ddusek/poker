from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, permissions, status
from api.serializers import *
from gameplay.deck import Deck


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
        players = int(request.data['players'])
        chips = int(request.data['chips'])

        # create game
        game = Game.objects.create()

        # create players
        for i in range(players):
            Player.objects.create(game=game, chips=chips)

        # create cards
        deck = Deck()
        for card in deck.set:
            Card.objects.create(game=game, suit=card.suit, rank=card.rank)

        return Response('200 success', status=status.HTTP_200_OK)
