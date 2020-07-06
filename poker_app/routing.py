from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import gameplay.routing

application = ProtocolTypeRouter({
    # http->django views is added by default
    'websocket': AuthMiddlewareStack(
        URLRouter(
            gameplay.routing.websocket_urlpatterns
        )
    )
})
