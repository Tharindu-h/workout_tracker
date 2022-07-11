from rest_framework import viewsets
from .serializers import ExerciseTypeSerializer
from .models import ExerciseType

class ExerciseTypeAPI(viewsets.ReadOnlyModelViewSet):
  queryset         = ExerciseType.objects.all()
  serializer_class = ExerciseTypeSerializer
  