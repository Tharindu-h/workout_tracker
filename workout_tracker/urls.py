from django.contrib import admin
from django.urls import path, include
from users.views import register
from django.contrib.auth import views as auth_views

urlpatterns = [
  path('admin/', admin.site.urls),
  path('register/', register, name='register'),
  path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
  path('logout/', auth_views.LogoutView.as_view(template_name='users/logout.html'), name='logout'),
  path('api/', include('workout_tracker.api')),
  path('users/', include('users.urls')),
  path('', include('workout.urls'))
]
