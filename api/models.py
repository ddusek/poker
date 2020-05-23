from django.db import models


class Game(models.Model):
    current_player = models.IntegerField(default=0)
    last_raise = models.IntegerField(default=0)
    biggest_bid = models.IntegerField(default=0)
    all_played = models.BooleanField(default=False)
    game_over = models.BooleanField(default=False)
    round_ended = models.BooleanField(default=False)
    path = models.SlugField(max_length=20)


class Player(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    chips = models.IntegerField(default=0)
    highest_combination = models.IntegerField(default=0)
    pot = models.IntegerField(default=0)
    round_bid = models.IntegerField(default=0)
    can_check = models.BooleanField(default=False)
    can_raise = models.BooleanField(default=False)
    can_call = models.BooleanField(default=False)
    is_folded = models.BooleanField(default=False)
    is_all_in = models.BooleanField(default=False)
    # owner = models.ForeignKey('auth.User', related_name='players', on_delete=models.CASCADE, default=None)


class Card(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, null=True, blank=True)
    suit = models.CharField(max_length=10)
    rank = models.CharField(max_length=2)
    location = models.CharField(default='DECK', max_length=6)

    def __str__(self):
        return '{} - {}'.format(self.suit, self.rank)
