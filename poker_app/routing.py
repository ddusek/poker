from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.conf.urls import url
import gameplay.routing

application = ProtocolTypeRouter({
    # http->django views is added by default
    'websocket': AuthMiddlewareStack(
        AuthMiddlewareStack(
            URLRouter(
                gameplay.routing.websocket_urlpatterns
            )
        )
    )
})


# TODO https://channels.readthedocs.io/en/latest/tutorial/index.html
#  probadly copy stuff from this tutorial
