# pylint: disable=missing-class-docstring, missing-function-docstring
class Combinations:
    def __init__(self, cards):
        self.cards = cards
        self.colors = [card.suit for card in cards]
        self.ranks = [card.rank for card in cards]
        self.is_flush = self._flush()
        self.is_straight = self._straight()

    def _royal_flush(self):
        if self.is_flush:
            if 'X' in self.ranks and 'J' in self.ranks and 'Q' in self.ranks and 'K' in self.ranks and \
                    'A' in self.ranks:
                return True
        return False

    def _straight_flush(self):
        if self.is_flush and self.is_straight:
            return True
        return False

    def _four_of_a_kind(self):
        values = [rank for rank in self.ranks]
        for rank in self.ranks:
            if values.count(rank) == 4:
                return True
        return False

    def _full_house(self):
        values = [rank for rank in self.ranks]
        value_of_three = None
        for rank in self.ranks:
            if values.count(rank) == 3:
                value_of_three = rank
                break
        if value_of_three is not None:
            for rank in self.ranks:
                if values.count(rank) == 2 and rank != value_of_three:
                    return True
        return False

    def _flush(self):
        for color in self.colors:
            if self.colors.count(color) == 5:
                return True
        return False

    def _straight(self):
        patterns = [[2, 3, 4, 5, 14], [6, 7, 8, 9, 10], [2, 3, 4, 5, 6], [7, 8, 9, 10, 11], [3, 4, 5, 6, 7],
                    [8, 9, 10, 11, 12], [4, 5, 6, 7, 8], [9, 10, 11, 12, 13], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14]]
        ranks = [rank for rank in self.ranks]
        if sorted(ranks) in patterns:
            return True
        return False

    def _three_of_a_kind(self):
        values = [rank for rank in self.ranks]
        for rank in self.ranks:
            if values.count(rank) == 3:
                return True
        return False

    def _two_pairs(self):
        values = [rank for rank in self.ranks]
        value_of_three = None
        for rank in self.ranks:
            if values.count(rank) == 2:
                value_of_three = rank
                break
        if value_of_three is not None:
            for rank in self.ranks:
                if values.count(rank) == 2 and rank != value_of_three:
                    return True
        return False

    def _pair(self):
        values = [rank for rank in self.ranks]
        for rank in self.ranks:
            if values.count(rank) == 2:
                return True
        return False

    def highest_combination(self):
        self._straight()
        if self._royal_flush():
            return 1
        if self._straight_flush():
            return 2
        if self._four_of_a_kind():
            return 3
        if self._full_house():
            return 4
        if self.is_flush:
            return 5
        if self.is_straight:
            return 6
        if self._three_of_a_kind():
            return 7
        if self._two_pairs():
            return 8
        if self._pair():
            return 9
        return 10
