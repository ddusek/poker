from django.db import models


class PlayerManager(models.Manager):
    def create(self, chips):
        player = self.create(chips=chips)
        return player


class GameManager(models.Manager):
    def create(self, players, chips):
        # game = gameplay.game.Game(players, chips)
        game = self.create(players=players, chips=chips)
        # game_model = self.create(current_player=game.current_player)
        return game


class Card(models.Model):
    suit = models.CharField(max_length=10)
    rank = models.CharField(max_length=2)

    def __str__(self):
        return '{} - {}'.format(self.suit, self.rank)


class Deck(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE, default=0)


class TableCards(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE, default=0)


class BurnedCards(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE, default=0)


class Table(models.Model):
    cards = models.ForeignKey(TableCards, on_delete=models.CASCADE, default=0)
    burned = models.ForeignKey(BurnedCards, on_delete=models.CASCADE, default=0)
    deck = models.OneToOneField(Deck, on_delete=models.CASCADE, default=0)


class Hand(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE, default=0)


class Action(models.Model):
    can_check = models.BooleanField(default=False)
    can_raise = models.BooleanField(default=False)
    can_call = models.BooleanField(default=False)


class Game(models.Model):
    current_player = models.IntegerField(default=None)
    last_raise = models.IntegerField(default=None)
    biggest_bid = models.IntegerField(default=None)
    all_played = models.BooleanField(default=None)
    game_over = models.BooleanField(default=None)
    round_ended = models.BooleanField(default=None)
    table = models.OneToOneField(Table, on_delete=models.CASCADE, default=None)
    # objects = GameManager()


class Player(models.Model):
    hand = models.OneToOneField(Hand, on_delete=models.CASCADE, default=None)
    chips = models.IntegerField()
    highest_combination = models.IntegerField(default=None)
    pot = models.IntegerField(default=None)
    round_bid = models.IntegerField(default=None)
    actions = models.OneToOneField(Action, on_delete=models.CASCADE, default=None)
    is_folded = models.BooleanField(default=None)
    is_all_in = models.BooleanField(default=None)
    table = models.ForeignKey(Game, on_delete=models.CASCADE, default=None)
    # owner = models.ForeignKey('auth.User', related_name='players', on_delete=models.CASCADE, default=None)
    objects = PlayerManager()
