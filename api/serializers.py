from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        owner = serializers.ReadOnlyField(source='owner.username')
        fields = '__all__'


class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Action
        fields = '__all__'


class HandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hand
        fields = '__all__'


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'


class BurnedCardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BurnedCards
        fields = '__all__'


class TableCardsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableCards
        fields = '__all__'


class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = '__all__'


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    players = serializers.PrimaryKeyRelatedField(many=True, queryset=Player.objects.all())

    class Meta:
        model = User
        fields = '__all__'


class PlayerDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = ['id', 'chips', 'actions', 'is_folded', 'is_all_in', 'highest_combination', 'hand', 'pot', 'round_bid']
