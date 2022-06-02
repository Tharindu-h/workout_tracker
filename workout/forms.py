from django import forms
from .models import Workout, Set

class WorkoutCreateForm(forms.ModelForm):
	class Meta:
		model = Workout
		fields = ['name', 'description', 'exercises']

		widgets = {
			'exercises' : forms.Select(attrs={'class': 'form-control'})
		}

class SetCreateForm(forms.ModelForm):
  class Meta:
    model = Set
    fields = ['weight', 'reps']