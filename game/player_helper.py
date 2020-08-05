from django.db.models import F
from game.models import Card


def adjust_orders(removed_player, players):
    """adjust orders of players according to removed_player

    :param removed_player: player to remove from order
    :param players: players to adjust
    """
    players.filter(in_game_order__gte=removed_player.in_game_order).update(in_game_order=F('in_game_order') - 1)
    removed_player.in_game_order = 0
    removed_player.save()


def deal_cards(game, players):
    """Deal cards to every player in game.
    """
    cards = iter(Card.objects.get_cards(game, len(players) * 2))
    for _ in range(2):
        for player in players:
            try:
                card = next(cards)
                card.location = 'HAND'
                card.player = player
                card.save()
            except StopIteration:
                print('error: too many iterations in cards dealing')
                break


def set_blinds(game, players):
    """set players blinds and save them.
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
    return all_in(player)


def all_in(player):
    """Bet all in.

    :return: updated player object
    """
    player.round_bet = player.chips
    player.chips = 0
    player.is_all_in = True
    return player


def set_allowed_actions(game, player):
    """Set actions which can player do this turn.

    :return: updated player object
    """
    player.can_check = can_check(game, player)
    player.can_call = can_call(game, player)
    player.can_raise = can_raise(game, player)
    player.can_fold = True
    player.can_all_in = True
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
