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


# Get player detail from playerID in session.
class PlayerDetailView(APIView):
    def get(self, request):
        if 'user_id' not in request.session:
            res = 'user not logged in'
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        player = Player.objects.filter(user=request.session['user_id']).first()
        return Response(PlayerSerializer(player).data, status=status.HTTP_200_OK)


# Get game detail based on url.
class GameDetailView(APIView):
    def get(self, request):
        if 'user_id' not in request.session:
            res = 'user not logged in'
            return Response(res, status=status.HTTP_401_UNAUTHORIZED)
        player = Player.objects.filter(user=request.session['user_id']).first()
        return Response(PlayerSerializer(player).data, status=status.HTTP_200_OK)


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
        game = Game.objects.create(path=path, max_players=players, starting_chips=chips)

        # create cards
        deck = Deck()
        for card in deck.set:
            Card.objects.create(game=game, suit=card.suit, rank=card.rank,
                                value=card.value, image=card.image)

        res = {'status': 200, 'msg': 'success', 'path': path}
        return Response(res, status=status.HTTP_200_OK)
