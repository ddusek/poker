class Player:
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


class Actions:
    def __init__(self):
        self.can_check = False
        self.can_raise = False
        self.can_call = False
