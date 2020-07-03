from django.db import models

from user.models import User


class Game(models.Model):
    max_players = models.IntegerField(default=8)
    starting_chips = models.IntegerField(default=200)
    current_player = models.IntegerField(default=0)
    last_raise = models.IntegerField(default=0)
    biggest_bid = models.IntegerField(default=0)
    all_played = models.BooleanField(default=False)
    game_over = models.BooleanField(default=False)
    round_ended = models.BooleanField(default=False)
    path = models.SlugField(max_length=20)


class Player(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    is_in_game = models.BooleanField(default=False)
    chips = models.IntegerField(default=0)
    highest_combination = models.IntegerField(default=0)
    pot = models.IntegerField(default=0)
    round_bid = models.IntegerField(default=0)
    can_check = models.BooleanField(default=False)
    can_raise = models.BooleanField(default=False)
    can_call = models.BooleanField(default=False)
    is_folded = models.BooleanField(default=False)
    is_all_in = models.BooleanField(default=False)


class Card(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, null=True, blank=True)
    suit = models.CharField(max_length=10)
    rank = models.CharField(max_length=2)
    value = models.IntegerField()
    image = models.CharField(max_length=20)
    location = models.CharField(default='DECK', max_length=6)

    def __str__(self):
        return '{} - {}'.format(self.suit, self.rank)
