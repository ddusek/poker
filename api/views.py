import pdb

from rest_framework.response import Response
from rest_framework.views import APIView
from api import *
from api.serializers import *
from rest_framework import viewsets, permissions, generics, status


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
    def post(self, request, format=None):
        players = request.query_params['players']
        chips = request.query_params['chips']

        # create game
        game = Game.objects.create()
        pdb.set_trace()
        game_id = 1  # get real id from game, needed for players
        serializer = GameSerializer(data=game)
        if serializer.is_valid():
            serializer.save()
        # abort if any serializer is invalid
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # create players
        for i in range(players):
            player = Player.objects.create(chips)
            player_serializer = PlayerSerializer(data=player)
            if player_serializer.is_valid():
                player_serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

