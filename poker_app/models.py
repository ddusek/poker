from django.db import models
from gameplay.game import Game


class GameModel(models.Model):
    id = models.IntegerField(primary_key=True)
    current_player = models.IntegerField()
    last_raise = models.IntegerField()
    all_played = models.BooleanField()
    game_over = models.BooleanField()
    round_ended = models.BooleanField()

class PlayerModel(models.Model):
    id = models.IntegerField(primary_key=True)
    # game = models.ForeignKey(Game, on_delete=models.CASCADE)
    chips = models.IntegerField()
