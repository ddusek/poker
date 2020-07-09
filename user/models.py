from django.db import models


class UserManager(models.Manager):
    """Custom User model manager, containing user creation.
    """
    def create_user(self, username, password):
        """Create user if all required parameters are given.

        :param username: username.
        :param password: password dictionary containing password and salt of user
        :raises ValueError: if some required data wasn't received
        :return: User object
        """
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
    """Data about registered users are stored here.
    """
    username = models.CharField(max_length=50, unique=True)
    pw_hash = models.CharField(max_length=500)
    salt = models.CharField(max_length=100)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    chips = models.IntegerField(default=1000)

    objects = UserManager()

    def __str__(self):
        return self.username
