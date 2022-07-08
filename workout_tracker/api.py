from django.urls import path, include

urlpatterns = [
  path('workout/', include('workout.urls'))
]