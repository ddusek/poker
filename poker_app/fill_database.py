from gameplay import game
from poker_app import models


class FillDatabase:
    def __init__(self, game):
        self.players = game.players
        self.table = game.table
        self.game = game

    def create_game(self):
        g = models.GameModel(id=1,
                             current_player=self.game.current_player,
                             last_raise=self.game.last_raise,
                             all_played=self.game.all_played,
                             game_over=self.game.game_over,
                             round_ended=self.game.round_ended
                             )
        return g

    def fill_data(self):
        g = self.create_game()
        g.save()
