class Player:
    def __repr__(self):
        return '(hand: %s\nchips: %s\npot: %s\nround_bid: %s\ncan_act: %s)' % (self.hand, self.chips, self.pot,
                                                                               self.round_bid, self.can_act)

    def __init__(self, player_id, chips):
        self.id = player_id
        self.hand = []
        self.highest_combination = 0
        self.chips = chips
        self.pot = 0
        self.round_bid = 0
        self.actions = Actions()
        self.is_folded = False
        self.is_all_in = False

    def bid(self, value):
        self.round_bid += value
        self.chips -= value

    def next_game(self):
        self.hand = []
        self.highest_combination = 0
        self.pot = 0
        self.round_bid = 0
        self.actions = Actions()
        self.is_folded = False
        self.is_all_in = False

    def can_act(self):
        return False if self.is_folded or self.is_all_in else True


class Actions:
    def __init__(self):
        self.can_check = False
        self.can_raise = False
        self.can_call = False
