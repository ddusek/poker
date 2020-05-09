from django.db import models
from django.contrib.auth.backends import ModelBackend


class UserManager(models.Manager):
    def create_user(self, username, password):
        if not username:
            raise ValueError('username is required')
        if not password:
            raise ValueError('password is required')
        if not password['pw']:
            raise ValueError('password not received')
        if not password['salt']:
            raise ValueError('salt not received')
        pw_hash = password['pw']
        salt = password['salt']
        user = self.model(
            username=username,
            pw_hash=pw_hash,
            salt=salt
        )
        user.save(using=self._db)
        return user


class User(models.Model):
    # in future add stuff like games_played, chips won, best winning combinations, etc...
    username = models.CharField(max_length=50, unique=True)
    pw_hash = models.CharField(max_length=500)
    salt = models.CharField(max_length=100)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    chips = models.IntegerField(default=1000)

    objects = UserManager()

    def __str__(self):
        return self.username


class UserAuthentication(ModelBackend):
    def authenticate(self, request, **kwargs):
        username = kwargs['username']
        password = kwargs['password']
        try:
            user = User.objects.get(username=username)
            if user.check_password(password) is True:
                return user
        except user.DoesNotExist:
            pass
