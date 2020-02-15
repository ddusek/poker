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


class Player(models.Model):
    hand = models.OneToOneField(Hand, on_delete=models.CASCADE, default=0)
    chips = models.IntegerField()
    highest_combination = models.IntegerField(default=10)
    pot = models.IntegerField(default=0)
    round_bid = models.IntegerField(default=0)
    actions = models.OneToOneField(Action, on_delete=models.CASCADE, default=0)
    is_folded = models.BooleanField(default=False)
    is_all_in = models.BooleanField(default=False)
    owner = models.ForeignKey('auth.User', related_name='players', on_delete=models.CASCADE, default=None)
    # objects = PlayerManager()


class Game(models.Model):
    current_player = models.IntegerField(default=0)
    last_raise = models.IntegerField(default=0)
    biggest_bid = models.IntegerField(default=0)
    all_played = models.BooleanField(default=False)
    game_over = models.BooleanField(default=False)
    round_ended = models.BooleanField(default=False)
    table = models.OneToOneField(Table, on_delete=models.CASCADE, default=0)
    players = models.ForeignKey(Player, on_delete=models.CASCADE, default=0)
    # objects = GameManager()

