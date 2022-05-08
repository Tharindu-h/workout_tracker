from dataclasses import field
from django import forms
from . models import *

class WorkoutCreateForm(forms.ModelForm):
    class Meta:
        model  = Workout
        fields = all