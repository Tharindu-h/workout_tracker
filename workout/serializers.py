from rest_framework import serializers
from .models import ExerciseType

class ExerciseTypeSerializer(serializers.ModelSerializer):
  
  class Meta:
    model  = ExerciseType
    fields = '__all__'