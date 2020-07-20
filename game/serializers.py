# pylint: disable=missing-class-docstring
from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['suit', 'rank', 'image']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class PlayerDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Player
        fields = ['id', 'chips', 'highest_combination', 'pot', 'is_folded', 'is_all_in',
                  'round_bet', 'can_check', 'can_raise', 'can_call']
