from random import shuffle


# class needed to determine highest card
class Rank:
    def __init__(self, rank, value):
        self.rank = rank
        self.value = value

    def __repr__(self):
        return '(%s, %s)' % (self.rank, self.value)


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
        self.ranks = [Rank('2', 2), Rank('3', 3), Rank('4', 4), Rank('5', 5), Rank('6', 6), Rank('7', 7), Rank('8', 8),
                      Rank('9', 9), Rank('X', 10), Rank('J', 11), Rank('Q', 12), Rank('K', 13), Rank('A', 14)]
        self.set = [Card(suit, rank) for rank in self.ranks for suit in self.suits]

    # shuffle deck
    def shuffle(self):
        shuffle(self.set)

    # return first card from deck, delete it from deck
    def give_card(self):
        card = self.set[0]
        del self.set[0]
        return card
