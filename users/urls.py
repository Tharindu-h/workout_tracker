from urllib.parse import urlparse
from django.contrib.auth import views as auth_views
from django.urls import path
from .views import profile

urlpatterns = [
  path('profile/', profile, name='profile'),
  path('password-reset/', 
    auth_views.PasswordResetView.as_view(template_name='users/password_reset.html'), 
    name='password_reset')
]
