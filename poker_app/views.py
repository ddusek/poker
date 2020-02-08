from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import get_object_or_404, render
from django.template import loader
from rest_framework.response import Response
from rest_framework.views import APIView
from poker_app.models import Game
from poker_app.serializers import GameSerializer
from . import models
from .forms import StartGameForm
from rest_framework import viewsets, status


class GameViewSet(APIView):
    def get(self, request, format=None):
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameViewDetail(APIView):
    def get_object(self, pk):
        try:
            return Game.objects.get(pk=pk)
        except:
            return Http404

    def get(self, request, pk, format=None):
        game = self.get_object(pk)
        serializer = GameSerializer(game)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        game = self.get_object(pk)
        serializer = GameSerializer(game, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        game = self.get_object(pk)
        game.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





    # def index(request):
    #     if request.method == 'POST':
    #         # create a form instance and populate it with data from the request:
    #         form = StartGameForm(request.POST)
    #         # check whether it's valid:
    #         if form.is_valid():
    #             # process the data in form.cleaned_data as required
    #             # ...
    #             # redirect to a new URL:
    #             return HttpResponseRedirect('/game/1')
    #
    #     # if a GET (or any other method) we'll create a blank form
    #     else:
    #         form = StartGameForm()
    #     # template = loader.get_template('index.html')
    #     # return HttpResponse(template.render())
    #
    #     return render(request, 'index.html', {'form': form})
    #
    # def game(request, game_id):
    #     game = models.GameModel.objects.create_game(3, 5, 500)
    #     game_model = models.GameModel()
    #     game_obj = get_object_or_404(game_model, pk=game_id)
    #     template = loader.get_template('game/index.html')
    #     return HttpResponse(template.render(game, request))
    #
    # def hand(request, player_id):
    #     a = 2