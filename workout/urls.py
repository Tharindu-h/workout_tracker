from django.urls import path
from .views import *

urlpatterns = [
  path('', WorkoutsOverView, name="workout_overview"),
  path('details/<int:pk>', WorkoutDetailsView.as_view(), name="workout_detail"),
  path('create', WorkoutCreateView.as_view(), name="workout_create")
]
