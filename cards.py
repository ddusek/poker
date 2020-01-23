class Deck:
    def __init__(self):
        self.suits = ['spades', 'hearts', 'diamonds', 'clubs']
        self.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'X', 'J', 'Q', 'K', 'A']

        self.set = [[rank, suit] for rank in self.ranks for suit in self.suits]


deck = Deck()
print(deck.set)

