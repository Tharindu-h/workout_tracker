from django.urls import path
from .views import *

urlpatterns = [
  path('', WorkoutsOverView.as_view(), name="workout_overview"),
  path('details/<int:pk>', WorkoutDetailsView.as_view(), name="workout_detail"),
  path('create', WorkoutCreateView.as_view(), name="workout_create"),
  path('update/<int:pk>', WorkoutUpdateView.as_view(), name="workout_update")
]
