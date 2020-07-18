from django.db import models

from user.models import User


class Game(models.Model):
    """Game contains game related data.
    Is is called every time a player needs to know some data from game.
    For example: size of blinds, if someone raised before him or if round ended.

    Game also contains path and name of a game.
    """
    max_players = models.IntegerField(default=8)
    players_connected = models.IntegerField(default=0)
    dealer = models.IntegerField(default=0)
    current_player = models.IntegerField(default=0)
    big_blind_player = models.IntegerField(default=0)
    small_blind_player = models.IntegerField(default=0)
    starting_chips = models.IntegerField(default=200)
    small_blind = models.IntegerField(default=5)
    big_blind = models.IntegerField(default=10)
    last_raise = models.IntegerField(default=0)
    biggest_bid = models.IntegerField(default=0)
    rounds_played = models.IntegerField(default=0)
    all_played = models.BooleanField(default=False)
    game_over = models.BooleanField(default=False)
    round_ended = models.BooleanField(default=False)
    game_initialized = models.BooleanField(default=False)
    path = models.CharField(max_length=30)
    name = models.SlugField(max_length=30)


class Player(models.Model):
    """Player contains game related data.

    has information like player's hand, chips, allowed actions.

    related to :model: `game.Game` and :model: `user.User`.
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    last_action = models.CharField(max_length=20, blank=True)
    in_game_order = models.IntegerField(default=0)
    chips = models.IntegerField(default=0)
    highest_combination = models.IntegerField(default=0)
    pot = models.IntegerField(default=0)
    round_bid = models.IntegerField(default=0)
    is_in_game = models.BooleanField(default=False)
    can_check = models.BooleanField(default=False)
    can_raise = models.BooleanField(default=False)
    can_call = models.BooleanField(default=False)
    is_folded = models.BooleanField(default=False)
    is_all_in = models.BooleanField(default=False)


class Card(models.Model):
    """Information about a specific card and its location.

    related to :model: `game.Game` and :model: `game.Player`.
    """
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, null=True, blank=True)
    suit = models.CharField(max_length=10)
    rank = models.CharField(max_length=2)
    value = models.IntegerField()
    image = models.CharField(max_length=20)
    location = models.CharField(default='DECK', max_length=6)

    def __str__(self):
        return '{} - {}'.format(self.suit, self.rank)
