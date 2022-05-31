from django import forms
from .models import Workout

class WorkoutCreateForm(forms.ModelForm):
	class Meta:
		model = Workout
		fields = ['name', 'description', 'exercises']