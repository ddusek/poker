from django.urls import path
from user.views import *

urlpatterns = [
    path('register/', CreateUserView.as_view(), name='user-register'),
    path('login/', LoginUserView.as_view(), name='user-login'),
    path('isloggedin/', UserLoggedInView.as_view(), name='user-logged-in'),
    path('currentuser/', CurrentUserIDView.as_view(), name='current-user-id')
]
