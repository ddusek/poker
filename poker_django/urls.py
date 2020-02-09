"""poker_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf.urls import include
from poker_app import views

router = routers.DefaultRouter()
router.register(r'games', views.GameViewSet, basename='games')
router.register(r'players', views.PlayerViewSet, basename='players')
router.register(r'users', views.UserViewSet, basename='users')


urlpatterns = [
    path('admin', admin.site.urls),
    path(r'api/', include(router.urls)),
    # path(r'api/game/', views.GameViewList.as_view()),
    # path(r'api/game/<int:pk>/', views.GameViewDetail.as_view()),
    # path('api', include('rest_framework.urls', namespace='rest_framework'))

    # path('', views.index, name='homepage'),
    # path('game/<int:game_id>/', views.game, name='game'),
]

urlpatterns += [
    path('api-auth/', include('rest_framework.urls')),
]