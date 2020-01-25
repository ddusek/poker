import random
from collections import namedtuple


class Card:
    def __init__(self, suit, rank):
        self.suit = suit
        self.rank = rank

    def __repr__(self):
        return '(%s, %s)' % (self.suit, self.rank)


class Deck:
    # make deck of 52 cards
    def __init__(self):
        self.suits = ['spades', 'hearts', 'diamonds', 'clubs']
        self.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'X', 'J', 'Q', 'K', 'A']
        self.set = [Card(rank, suit) for rank in self.ranks for suit in self.suits]

    # get card by index
    def get_card(self, card):
        return self.set[card].rank, self.set[card].suit

    # shuffle deck
    def shuffle(self):
        random.shuffle(self.set)

    # return first card from deck, delete it from deck
    def take_card(self):
        card = self.set[0]
        del self.set[0]
        return card

    # delete first card from deck
    def burn_card(self):
        del self.set[0]


deck = Deck()
deck.shuffle()
print(deck.set)
print(len(deck.set))

