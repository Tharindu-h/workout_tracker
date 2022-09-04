from django import forms
from .models import Workout, Set

class WorkoutCreateForm(forms.ModelForm):
	class Meta:
		model = Workout
		fields = ['name', 'exercises']

		widgets = {
			'exercises' : forms.Select(attrs={'class': 'form-control'})
		}
