from django.contrib import admin
from .models import Game, Player, Action, BurnedCards, Deck, Card, Hand, Table, TableCards

# Register your models here.
admin.site.register(Game)
admin.site.register(Table)
admin.site.register(Deck)
admin.site.register(TableCards)
admin.site.register(BurnedCards)
admin.site.register(Player)
admin.site.register(Action)
admin.site.register(Hand)
admin.site.register(Card)
