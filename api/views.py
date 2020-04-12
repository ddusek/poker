from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import *
from rest_framework import viewsets, permissions, generics


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


class ActionViewSet(viewsets.ModelViewSet):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer


class HandViewSet(viewsets.ModelViewSet):
    queryset = Hand.objects.all()
    serializer_class = HandSerializer


class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = TableSerializer


class BurnedCardsViewSet(viewsets.ModelViewSet):
    queryset = BurnedCards.objects.all()
    serializer_class = BurnedCardsSerializer


class TableCardsViewSet(viewsets.ModelViewSet):
    queryset = TableCards.objects.all()
    serializer_class = TableCardsSerializer


class DeckViewSet(viewsets.ModelViewSet):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer


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