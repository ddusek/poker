from django.urls import path
from user.views import LoginUserView, CreateUserView

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='user-register'),
    path('login/', LoginUserView.as_view(), name='user-login'),
]
