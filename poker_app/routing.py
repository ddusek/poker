from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.conf.urls import url

from api.models import *

application = ProtocolTypeRouter({
    # Empty for now (http->django views is added by default)
    'websocket': AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                [
                    url('game/<str:gameid>', Game)
                ]
            )
        )
    )
})


# TODO https://channels.readthedocs.io/en/latest/tutorial/index.html
#  probadly copy stuff from this tutorial
