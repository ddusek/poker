from django.urls import path, include
from rest_framework import routers
from api.views import *


router = routers.DefaultRouter()
router.register(r'games', GameViewSet, basename='games')
router.register(r'players', PlayerViewSet, basename='players')
router.register(r'actions', ActionViewSet, basename='actions')
router.register(r'hands', HandViewSet, basename='hands')
router.register(r'tables', TableViewSet, basename='tables')
router.register(r'burnedcards', BurnedCardsViewSet, basename='burnedcards')
router.register(r'tablecards', TableCardsViewSet, basename='tablecards')
router.register(r'decks', DeckViewSet, basename='decks')
router.register(r'cards', CardViewSet, basename='cards')
router.register(r'users', UserViewSet, basename='users')


urlpatterns = [
    path(r'api/', include(router.urls)),
    ]
