from django.shortcuts import render, get_object_or_404
from django.views.generic import DetailView, CreateView, UpdateView, DeleteView, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.forms.models import modelformset_factory
from .models import *
from .forms import WorkoutCreateForm, SetCreateForm

class WorkoutsOverView(LoginRequiredMixin, TemplateView):
	template_name = 'workout/overview.html'
    
	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['workouts'] = Workout.objects.filter(user__pk=self.request.user.id)
		return context

class WorkoutDetailsView(LoginRequiredMixin, DetailView):
	model         = Workout
	template_name = 'workout/detail.html'

	def get_queryset(self):
		return self.model.objects.filter(user__pk=self.request.user.id)
	
	def get_context_data(self, **kwargs):
		context  = super().get_context_data(**kwargs)
		queryset = Set.objects.filter(workout__user__pk=self.request.user.id, workout__pk=self.object.pk)
		exercises_sets = [[]] 
		for obj in self.object.exercises.all():
			current_exercise = []
			for set in queryset:
				if set.exercise.pk == obj.pk:
					current_exercise.append(set)
			exercises_sets.append(current_exercise)
		context["sets"] = exercises_sets			
		return context
	

class WorkoutCreateView(LoginRequiredMixin, CreateView):
	model         = Workout
	form_class    = WorkoutCreateForm
	template_name = 'workout/create_workout.html'


# function based view might be a better option for create and edit views
# I could use htmx to make ajax calls in the form, so when it gets created 
# 

class WorkoutUpdateView(LoginRequiredMixin, UpdateView):
  model = Workout
  form_class = WorkoutCreateForm
  template_name = 'workout/create_workout.html'

@login_required
def workout_edit_view(request, pk=None):
  obj     = get_object_or_404(Workout, pk=pk, user=request.user)
  form    = WorkoutCreateForm(request.POST or None, instance=obj)
  form_2  = SetCreateForm(request.POST or None)

  # SetCreateFormSet = modelformset_factory(Set, form=SetCreateForm, extra=0)
  # formset = SetCreateFormSet(request.POST or None)

  context = {
    'form'   : form,
    'form_2' : form_2,
    'object' : obj
  }
  
  if form.is_valid() and form_2.is_valid():
    form.save(commit=False)
    form_2.save(commit=False)
    print("form", form.cleaned_data)
    print("form_2", form_2.cleaned_data)

  return render(request, 'workout/create_workout.html', context)






