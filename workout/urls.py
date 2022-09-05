from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import *
from .api import ExerciseTypeAPI

urlpatterns = [
  path('', WorkoutsOverView.as_view(), name="workout_overview"),
  path('details/<int:pk>', WorkoutDetailsView.as_view(), name="workout_detail"),
  path('create', workout_create_view, name="workout_create"),
  path('update/<int:pk>', workout_edit_view, name="workout_update"),
  path('clone/<int:pk>', workout_clone_view, name="workout_clone"),
  path('delete/<int:pk>', WorkoutDelete.as_view(), name="workout_delete"),
  path('templates', TemplatesOverView.as_view(), name="templates_overview"),
  path('templates/create', workout_template_create_view, name="template_create")
]

#API routes
router = DefaultRouter()
router.register(r'exercise-types', ExerciseTypeAPI, basename='exercise_types_api')

urlpatterns += router.urls