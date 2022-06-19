from django.shortcuts import render, get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import DetailView, DeleteView, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.forms.models import modelformset_factory
from .models import *
from .forms import WorkoutCreateForm#, SetCreateForm

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


# function based view might be a better option for create and edit views
# I could use htmx to make ajax calls in the form, so when it gets created 
# 

@login_required
def workout_create_view(request):

  exercises = ExerciseType.objects.all()
  context = {
    'exercises' : exercises
  }

  if request.method == "POST":
    print(request.POST)
  return render(request, 'workout/create_workout.html', context)

"""
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
"""

class WorkoutDelete(DeleteView):
  model       = Workout
  success_url = reverse_lazy('workout_overview')

  def test_func(self):
    workout = self.get_object()
    if self.request.user == workout.user:
      return True
    return False

