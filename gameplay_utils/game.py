from gameplay_utils.combinations import Combinations
from gameplay_utils.player import Player
from gameplay_utils.table import Table


# blinds, min bid
class Bids:
    def __init__(self, s_blind_val):
        self.s_blind_turn = 0
        self.s_blind_val = s_blind_val
        self.b_blind_turn = 1
        self.b_blind_val = self.s_blind_val * 2


class Game:
    # start of a game init
    def __init__(self, players, s_blind, chips):
        self.table = Table()
        self.players = []
        [self.players.append(Player(i, chips)) for i in range(players)]
        self.current_player = 0
        self.combinations = {1: 'royal flush', 2: 'straight flush', 3: 'four of a kind',
                             4: 'full house', 5: 'flush', 6: 'straight', 7: 'three of a kind',
                             8: 'two pairs', 9: 'pair', 10: 'high card'}
        self.bids = Bids(s_blind)
        self.last_raise = 0
        self.biggest_bid = self.bids.b_blind_val

        self.all_played = False
        self.game_over = False
        self.round_ended = False
        self.played = 0

    # next game init
    def next_game(self):
        self.last_raise = 0
        self.biggest_bid = self.bids.b_blind_val
        self.table = Table()
        [player.next_game() for player in self.players]
        self.bids.s_blind_turn += 1 if self.bids.s_blind_turn < len(self.players) else 0
        self.bids.b_blind_turn += 1 if self.bids.b_blind_turn < len(self.players) else 0
        self.all_played = False
        self.round_ended = False
        self.played = 0

    # next round init
    def next_round(self):
        self.last_raise = 0
        self.biggest_bid = self.bids.b_blind_val
        self.all_played = False
        self.round_ended = False
        self.played = 0

    # bid small and big blind, change blind turns
    def blinds(self):
        self.players[self.bids.s_blind_turn].bid(self.bids.s_blind_val)
        self.players[self.bids.b_blind_turn].bid(self.bids.b_blind_val)

    # blinds, give every player 2 cards, burn 1 card and put on table 3 cards
    def start_game(self):
        self.blinds()
        [player.hand.append(self.table.deck.give_card())
         for player in self.players for _ in range(2)]
        self.table.burned.append(self.table.deck.give_card())
        [self.table.cards.append(self.table.deck.give_card()) for _ in range(3)]

    # burn a card and put next one on table
    def next_card(self):
        self.table.burned.append(self.table.deck.give_card())
        self.table.cards.append(self.table.deck.give_card())

    # get highest combination of a player
    def highest_combination(self):
        cards = self.table.cards + self.players[self.current_player].hand
        combinations = Combinations(cards)
        return combinations.highest_combination()

    # get player's allowed actions
    def allowed_actions(self):
        self.can_check()
        self.can_raise()
        self.can_call()

    # next player's turn
    def next_player(self):
        self.current_player += 1 if self.current_player < len(self.players) else 0
        self.played += 1

    # true if player's round_bid >= every others round_bid
    def can_check(self):
        for player in self.players:
            if self.players[self.current_player].round_bid < player.round_bid:
                self.players[self.current_player].actions.can_check = False
                return False
        self.players[self.current_player].actions.can_check = True
        return True

    # true if last raise and big blind is lower than player's total chips
    def can_raise(self):
        if self.players[self.current_player].chips >= self.last_raise and \
                self.players[self.current_player].chips >= self.bids.b_blind_val:
            self.players[self.current_player].actions.can_raise = False
            return False
        self.players[self.current_player].actions.can_call = True
        return True

    # true if player have enough chips for call
    def can_call(self):
        for player in self.players:
            if self.players[self.current_player].chips \
               + self.players[self.current_player].round_bid <= player.round_bid:
                self.players[self.current_player].actions.can_call = False
                return False
        self.players[self.current_player].actions.can_call = True
        return True

    # action check
    def check(self):
        return

    # action call
    def call(self):
        self.players[self.current_player].bid(
            self.biggest_bid - self.players[self.current_player].round_bid)

    # action raise
    def raize(self, value):
        self.players[self.current_player].bid(value)
        self.biggest_bid = self.players[self.current_player].round_bid

    # action all_in
    def all_in(self):
        self.players[self.current_player].bid(self.players[self.current_player].chips)
        if self.biggest_bid < self.players[self.current_player].round_bid:
            self.biggest_bid = self.players[self.current_player].round_bid
        self.players[self.current_player].is_all_in = True

    # action fold
    def fold(self):
        self.players[self.current_player].is_folded = True

    # do selected action
    def do_action(self, action, raize_val=0):
        if action == 1:
            self.check()
        elif action == 2:
            self.call()
        elif action == 3:
            self.raize(raize_val)
        elif action == 4:
            self.all_in()
        else:
            self.fold()

    # init players turn, before he can do action
    def player_turn(self):
        self.allowed_actions()
        self.players[self.current_player].highest_combination = self.highest_combination()

    def can_next_round(self):
        bid = self.players[self.current_player].round_bid
        for player in self.players:
            if player.round_bid != bid and player.can_act():
                return False

    def can_next_game(self):
        self.round_ended = True if len(self.table.cards) > 4 else False
        self.all_played = True if self.played >= len(self.players) else False
        return True if self.round_ended and self.all_played else False

    def get_all_played(self):
        self.all_played = True if self.played >= len(self.players) else False


if __name__ == '__main__':
    # init game, only once
    game = Game(3, 5, 500)
    game.start_game()

    # cycle this till game ends
    while not game.game_over:
        while not game.round_ended:
            # if player still playing this game
            if game.players[game.current_player].can_act():
                game.player_turn()  # get player allowed actions and highest combination
                # before he can do action
                print('test input action: 1 - check, 2 - call 3 - call 4 - all_in')
                test_action = input()
                print('test input raise value if raise')
                test_raize = input()
                game.do_action(1)  # do action (call, check, etc)
                game.next_player()  # change current player to next and repeat
                print(game.players[game.current_player].id)
                print(game.players[game.current_player])

                if game.can_next_round():
                    game.next_round()

        if game.can_next_game():
            game.next_game()  # init next game and repeat
