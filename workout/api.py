from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import ExerciseTypeSerializer
from .models import ExerciseType

class ExerciseTypeAPI(viewsets.ReadOnlyModelViewSet):
  queryset         = ExerciseType.objects.all()
  serializer_class = ExerciseTypeSerializer
  