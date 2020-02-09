from django.contrib.auth.models import User
from .models import Game, Player
from rest_framework import serializers


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id',
                  'current_player',
                  'last_raise',
                  'biggest_bid',
                  'all_played',
                  'game_over',
                  'round_ended',
                  'table',
                  'players')

    def create(self, validated_data):
        game = Game.objects.create(**validated_data)
        return game


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        owner = serializers.ReadOnlyField(source='owner.username')
        fields = ('id',
                  'hand',
                  'chips',
                  'highest_combination',
                  'pot',
                  'round_bid',
                  'actions',
                  'is_folded',
                  'is_all_in',
                  'owner')


class UserSerializer(serializers.ModelSerializer):
    players = serializers.PrimaryKeyRelatedField(many=True, queryset=Player.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'players']