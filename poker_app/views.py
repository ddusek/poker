from django.contrib.auth.models import User
from poker_app.models import Game, Player
from poker_app.serializers import GameSerializer, PlayerSerializer, UserSerializer
from rest_framework import viewsets, permissions


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

# class GameViewList(generics.ListCreateAPIView):
#     queryset = Game.objects.all()
#     serializer_class = GameSerializer
#
#
# class GameViewDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Game.objects.all()
#     serializer_class = GameSerializer
