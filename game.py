from player import Player
from table import Table

class Game:
    def __init__(self, players):
        self.table = Table()
        self.players = []
        [self.players.append(Player(i, 500)) for i in range(players)]
        self.combinations = ('royal flush', 'straight flush', 'full house', 'flush', 'straight',
                             'three of a kind', 'two pairs', 'pair', 'high card')

    # give every player 2 cards, burn 1 card and put on table 3 cards
    def start_game(self):
        [player.hand.append(self.table.deck.give_card()) for player in self.players for i in range(2)]
        self.table.burned.append(self.table.deck.give_card())
        [self.table.cards.append(self.table.deck.give_card()) for i in range(3)]

    def card_on_table(self):
        self.table.cards.append(self.table.deck.give_card())

    def highest_combination(self, player):
        cards = self.table.cards + player.hand


game = Game(2)
game.start_game()

print('p2', game.players[1].hand)
print('p1', game.players[0].hand)
print('table', game.table.cards)
print('burned', game.table.burned)
print('deck', len(game.table.deck.set))
print(game.combinations[0])

print(game.highest_combination(game.players[0]))
