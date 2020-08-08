import random
from game.models import Card
from gameplay_utils.deck import Deck
from . import utils


def create_deck(game):
    """Create deck of cards.
    """
    deck = Deck()
    for card in deck.set:
        Card.objects.create(game=game, suit=card.suit, rank=card.rank,
                            value=card.value, image=card.image)


def delete_deck(game):
    """Delete deck for a game.
    """
    Card.objects.filter(game=game).delete()


def shuffle(game):
    """shuffle all cards in deck (change 'order' field).
    """
    cards = Card.objects.filter(game=game, location='DECK')
    order_numbers = list(range(len(cards)))
    random.shuffle(order_numbers)
    for i, n in enumerate(order_numbers):
        cards[i].order = n
        cards[i].save()


def _get_cards(game, limit):
    """Get first N cards from DECK.

    :return: queryset of cards
    """
    return Card.objects.filter(game=game, location='DECK').order_by('order')[:limit]


def _deal_cards_for_player(player, cards):
    """Deal list of cards cards for player.
    """
    for card in cards:
        card.player = player
        card.location = 'HAND'
        card.save()


def deal_cards(game, players):
    """Deal 2 cards for N players.

    :param players: player objects
    """
    # get chunks of 2 cards for every player
    cards = utils.chunks(_get_cards(game, (len(players) * 2) + 1), 2)
    for player in players:
        _deal_cards_for_player(player, next(cards))


def init_cards(game):
    """Delete deck from a game and create and shuffle new one.
    """
    delete_deck(game)
    create_deck(game)
    shuffle(game)
