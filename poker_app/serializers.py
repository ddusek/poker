from .models import Game
from rest_framework import serializers


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id',
                  'current_player',
                  'last_raise',
                  'all_played',
                  'game_over',
                  'round_ended')

    def create(self, validated_data):
        game = Game.objects.create(**validated_data)
        return game
