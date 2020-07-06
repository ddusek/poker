from rest_framework import serializers

from user.models import User


class UserSerializerChecker(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'salt', 'pw_hash']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'chips', 'date_joined', 'last_login']
