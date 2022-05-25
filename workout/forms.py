from dataclasses import field
from pyexpat import model
from django import forms
from .models import Workout

class WorkoutCreateForm(forms.ModelForm):
	class Meta:
		model = Workout
		fields = '__all__'