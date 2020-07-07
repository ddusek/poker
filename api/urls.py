from django.urls import path
from api.views import *


urlpatterns = [
    path('get/player-detail/', PlayerDetailView.as_view(), name='player-detail'),
    path('get/game-detail/', GameDetailView.as_view(), name='game-detail'),
    path('post/game/', GameCreateView.as_view(), name='game-create'),
]