from django.contrib import admin
from django.contrib.sessions.models import Session

from .models import *

admin.site.register(Game)
admin.site.register(Player)
admin.site.register(Card)
admin.site.register(Session)
