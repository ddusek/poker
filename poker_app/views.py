from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.template import loader
from . import models


def index(request):
    return HttpResponse('Hello, World!')


def game(request, game_id):
    game = models.GameModel.objects.create_game(3, 5, 500)
    game_model = models.GameModel()
    game_obj = get_object_or_404(game_model, pk=game_id)
    template = loader.get_template('game/index.html')
    return HttpResponse(template.render(game_obj, request))


def hand(request, player_id):
    a = 2