from rest_framework import viewsets
from django.db.models import Q
from .serializers import ExerciseTypeSerializer
from .models import ExerciseType

class ExerciseTypeAPI(viewsets.ReadOnlyModelViewSet):
  serializer_class = ExerciseTypeSerializer
  
  def get_queryset(self):
    return ExerciseType.objects.filter(Q(user__id=1) | Q(user__id=self.request.user.pk))