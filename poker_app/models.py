from django.db import models


class GameManager(models.Manager):
    def create(self, players, chips):
        game = self.create(players=players, chips=chips)
        return game


class Game(models.Model):
    current_player = models.IntegerField(default=0)
    last_raise = models.IntegerField(default=0)
    all_played = models.BooleanField(default=False)
    game_over = models.BooleanField(default=False)
    round_ended = models.BooleanField(default=False)
    objects = GameManager()


class Player(models.Model):
    id = models.IntegerField(primary_key=True)
    # game = models.ForeignKey(Game, on_delete=models.CASCADE)
    chips = models.IntegerField()
