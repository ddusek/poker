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
from rest_framework.urlpatterns import format_suffix_patterns

from poker_app import views

# router = routers.DefaultRouter()
# router.register(r'api_info', views.GameViewSet, basename='api_info')

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api/game/', views.GameViewSet.as_view()),
    path(r'api/game/<int:pk>/', views.GameViewDetail.as_view()),
    # path('api', include('rest_framework.urls', namespace='rest_framework'))

    # path('', views.index, name='homepage'),
    # path('game/<int:game_id>/', views.game, name='game'),
]

urlpatterns = format_suffix_patterns(urlpatterns)