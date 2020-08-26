from django.db.models import F
from game.models import Game
from . import game_helper


def adjust_orders(removed_player, players):
    """Adjust orders of players according to disconnected player.

    :param removed_player: player to remove from order
    :param players: players to adjust
    """
    players.filter(in_game_order__gte=removed_player.in_game_order).update(in_game_order=F('in_game_order') - 1)
    removed_player.in_game_order = 0
    removed_player.save()


def set_blinds(game, players):
    """Set players blinds and save them.
    """
    bb_player = players.filter(id=game.big_blind_player).first()
    sb_player = players.filter(id=game.small_blind_player).first()
    bb_player = bet(bb_player, game.big_blind)
    sb_player = bet(sb_player, game.small_blind)

    bb_player.save()
    sb_player.save()


def bet(player, value):
    """Bet given amount of chips.

    If player has less or equal chips, then bet all in.

    :return: updated player object
    """
    if value < player.chips:
        player.chips -= value
        player.round_bet += value
        return player
    player.round_bet = player.chips
    player.chips = 0
    player.is_all_in = True
    return player


def raize(player, value):
    """Raise given amount of chips.
    """
    player = bet(player, value)
    game = Game.objects.filter(id=player.game.id).first()
    game = game_helper.new_bet(game, value, player.round_bet)
    player.save()
    game.save()


def call(game, player):
    """Call highest bet in game.
    """
    call_val = player.round_bet - game.biggest_bet
    player = bet(player, call_val)
    game = game_helper.new_bet(game, call_val, player.pot)
    player.save()
    game.save()


def all_in(game, player):
    """Bet all in.
    """
    player.round_bet += player.chips
    game = game_helper.new_bet(game, player.chips, player.pot)
    player.chips = 0
    player.is_all_in = True
    player.save()
    game.save()

 
def check(game, player):
    """Check action.
    """
    return


def fold(player):
    """Fold action.

    :param player: [description]
    :type player: [type]
    """
    player.is_in_game = False
    player.save()


def set_allowed_actions(game, player):
    """Set actions which can player do this turn.

    :return: updated player object
    """
    player.can_check = can_check(game, player)
    player.can_call = can_call(game, player)
    player.can_raise = can_raise(game, player)
    player.can_fold = player.is_in_game
    player.can_all_in = player.is_in_game
    return player


def can_check(game, player):
    """Check if player can check.

    :return: bool
    """
    if game.biggest_bet <= player.round_bet:
        return True
    return False


def can_call(game, player):
    """Check if player can check.

    :return: bool
    """
    if (game.biggest_bet - player.pot) <= player.chips:
        return True
    return False


def can_raise(game, player):
    """Check if player can raise or reraise.

    Player can reraise only if someone else full raised.
    :return: bool
    """
    if (game.biggest_bet + game.last_raise - player.pot) <= player.chips:
        return True
    return False
