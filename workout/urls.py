from django.urls import path
from django.contrib.auth.decorators import login_required
from .views import *

urlpatterns = [
  path('', login_required(WorkoutsOverView.as_view()), name="workout_overview"),
  path('details/<int:pk>', login_required(WorkoutDetailsView.as_view()), name="workout_detail"),
  path('create', login_required(WorkoutCreateView.as_view()), name="workout_create")
]
