from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView, View, TemplateView
from django.db import models
from django.db.models import fields
from .models import *

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
        context = super().get_context_data(**kwargs)
        #context[""] = 
        w = Workout.objects.all()
        for i in w:
            print(i.exercises.all())
            for j in i.exercises.all():
                print(j.set.all())
        return context
    
