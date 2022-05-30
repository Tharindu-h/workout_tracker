from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, View, TemplateView
from django.db import models
from django.db.models import fields
from .models import *
from .forms import WorkoutCreateForm

class WorkoutsOverView(TemplateView):
	template_name = 'workout/overview.html'
    
	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['workouts'] = Workout.objects.all()
		return context

class WorkoutDetailsView(DetailView):
	model         = Workout
	template_name = 'workout/detail.html'

	def get_context_data(self, **kwargs):
			context  = super().get_context_data(**kwargs)
			queryset = Set.objects.filter(workout__pk=self.object.pk)
			exercises_sets = [[]] 
			for obj in self.object.exercises.all():
				current_exercise = []
				for set in queryset:
					if set.exercise.pk == obj.pk:
						current_exercise.append(set)
				exercises_sets.append(current_exercise)
			context["sets"] = exercises_sets	
			print(context)				
			return context
	

class WorkoutCreateView(CreateView):
	model         = Workout
	form_class    = WorkoutCreateForm
	template_name = 'workout/create_workout.html'
