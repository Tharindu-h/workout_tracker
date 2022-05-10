from django.urls import path
from .views import *

urlpatterns = [
    path('', WorkoutsOverView.as_view(), name="workout_overview"),
    path('details/<int:pk>', WorkoutDetailsView.as_view(), name="workout_detail")
]
