from gameplay_utils.deck import Deck


class Table:
    def __init__(self):
        self.cards = []
        self.burned = []
        self.deck = Deck()
        self.deck.shuffle()
