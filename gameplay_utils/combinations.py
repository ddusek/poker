# pylint: disable=missing-class-docstring, missing-function-docstring
class Combinations:
    def __init__(self, cards):
        self.cards = cards
        self.colors = [card.suit for card in cards]
        self.ranks = [card.rank for card in cards]
        self.is_flush = self.flush()
        self.is_straight = self.straight()

    def royal_flush(self):
        if self.is_flush:
            if 'X' in self.ranks and 'J' in self.ranks and 'Q' in self.ranks and 'K' in self.ranks and \
                    'A' in self.ranks:
                return True
        return False

    def straight_flush(self):
        if self.is_flush and self.is_straight:
            return True
        return False

    def four_of_a_kind(self):
        values = [rank.value for rank in self.ranks]
        for rank in self.ranks:
            if values.count(rank.value) == 4:
                return True
        return False

    def full_house(self):
        values = [rank.value for rank in self.ranks]
        value_of_three = None
        for rank in self.ranks:
            if values.count(rank.value) == 3:
                value_of_three = rank.value
                break
        if value_of_three is not None:
            for rank in self.ranks:
                if values.count(rank.value) == 2 and rank.value != value_of_three:
                    return True
        return False

    def flush(self):
        for color in self.colors:
            if self.colors.count(color) == 5:
                return True
        return False

    def straight(self):
        patterns = [[2, 3, 4, 5, 14], [6, 7, 8, 9, 10], [2, 3, 4, 5, 6], [7, 8, 9, 10, 11], [3, 4, 5, 6, 7],
                    [8, 9, 10, 11, 12], [4, 5, 6, 7, 8], [9, 10, 11, 12, 13], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14]]
        ranks = [rank.value for rank in self.ranks]
        if sorted(ranks) in patterns:
            return True
        return False

    def three_of_a_kind(self):
        values = [rank.value for rank in self.ranks]
        for rank in self.ranks:
            if values.count(rank.value) == 3:
                return True
        return False

    def two_pairs(self):
        values = [rank.value for rank in self.ranks]
        value_of_three = None
        for rank in self.ranks:
            if values.count(rank.value) == 2:
                value_of_three = rank.value
                break
        if value_of_three is not None:
            for rank in self.ranks:
                if values.count(rank.value) == 2 and rank.value != value_of_three:
                    return True
        return False

    def pair(self):
        values = [rank.value for rank in self.ranks]
        for rank in self.ranks:
            if values.count(rank.value) == 2:
                return True
        return False

    def highest_combination(self):
        self.straight()
        if self.royal_flush():
            return 1
        if self.straight_flush():
            return 2
        if self.four_of_a_kind():
            return 3
        if self.full_house():
            return 4
        if self.is_flush:
            return 5
        if self.is_straight:
            return 6
        if self.three_of_a_kind():
            return 7
        if self.two_pairs():
            return 8
        if self.pair():
            return 9
        return 10
