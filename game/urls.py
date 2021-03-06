from django.urls import path
from game.views import *


urlpatterns = [
    path('get/game-detail/', GameDetailView.as_view(), name='game-detail'),
    path('get/player-detail/', PlayerDetailView.as_view(), name='player-detail'),
    path('get/players-details/', PlayersDetailsView.as_view(), name='players-details'),
    path('get/cards-detail/', CardsDetailView.as_view(), name='cards-detail'),
    path('get/table-cards-detail/', TableCardsDetailView.as_view(), name='table-cards-detail'),
    path('get/player-actions/', PlayerActionsView.as_view(), name='player-actions'),
    path('post/game/', GameDetailView.as_view(), name='game-create'),
    path('post/player/raise/', PlayerRaiseView.as_view(), name='player-raise'),
]
