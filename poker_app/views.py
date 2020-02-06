from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.template import loader
from . import models
from .forms import StartGameForm

def index(request):
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = StartGameForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            return HttpResponseRedirect('/game/1')

    # if a GET (or any other method) we'll create a blank form
    else:
        form = StartGameForm()
    # template = loader.get_template('index.html')
    # return HttpResponse(template.render())

    return render(request, 'index.html', {'form': form})


def game(request, game_id):
    game = models.GameModel.objects.create_game(3, 5, 500)
    game_model = models.GameModel()
    game_obj = get_object_or_404(game_model, pk=game_id)
    template = loader.get_template('game/index.html')
    return HttpResponse(template.render(game, request))


def hand(request, player_id):
    a = 2