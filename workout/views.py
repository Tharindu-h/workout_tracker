from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import DetailView, DeleteView, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from .models import *

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


@login_required
def workout_create_view(request):

  exercises = ExerciseType.objects.all()
  context = {
    'exercises' : exercises
  }

  if request.method == "POST":
    if request.POST.get("save") or request.POST.get("finish"):
      workout = Workout(name=request.POST.get("name"), user=User.objects.get(username=request.user))
      workout.save()
      workout_exercises   = [] 
      curr_exercise_number = 1
      for e in request.POST.getlist("exercise"):
        curr_e_type     = ExerciseType.objects.get(name=e)
        curr_exercise   = Exercise(exercise_number=curr_exercise_number, exercise_type=curr_e_type, rpe=10)
        curr_exercise.save()
        curr_set_number = 1
        curr_exercise_sets = []
        for s in request.POST.getlist(f"E{curr_exercise_number}-reps"):
          print(request.POST.getlist(f"E{curr_exercise_number}-reps"))
          curr_weight   = request.POST.getlist(f"E{curr_exercise_number}-weight")[curr_set_number - 1]
          curr_set      = Set(set_number=curr_set_number, 
                            weight=curr_weight, 
                            reps=s)
          curr_set.save()
          curr_set_number += 1
          curr_exercise.sets.add(curr_set)
        workout_exercises.append(curr_exercise)
        workout.exercises.add(curr_exercise)
        curr_exercise_number += 1
      if request.POST.get("save"):
        context["object"] = workout
        return redirect('workout_update', workout.pk)
      return redirect('workout_detail', workout.pk)

  return render(request, 'workout/create_workout.html', context)

class WorkoutDelete(DeleteView):
  model       = Workout
  success_url = reverse_lazy('workout_overview')

  def test_func(self):
    workout = self.get_object()
    if self.request.user == workout.user:
      return True
    return False


@login_required
def workout_edit_view(request, pk):

  obj             = Workout.objects.get(pk=pk)
  if obj.user.pk != request.user.pk:
    return HttpResponseForbidden()
  
  exercises = ExerciseType.objects.all()
  context   = {
    'exercises' : exercises,
    'object'    : obj
  }

  if request.method == "POST":
    if request.POST.get("save") or request.POST.get("finish"):
      old_exercises        = obj.exercises.all()
      for e in old_exercises:
        e.delete()
      workout_exercises    = [] 
      curr_exercise_number = 1
      for e in request.POST.getlist("exercise"):
        curr_e_type     = ExerciseType.objects.get(name=e)
        curr_exercise   = Exercise(exercise_number=curr_exercise_number, exercise_type=curr_e_type, rpe=10)
        curr_exercise.save()
        curr_set_number = 1
        curr_exercise_sets = []
        for s in request.POST.getlist(f"E{curr_exercise_number}-reps"):
          print(request.POST.getlist(f"E{curr_exercise_number}-reps"))
          curr_weight   = request.POST.getlist(f"E{curr_exercise_number}-weight")[curr_set_number - 1]
          curr_set      = Set(set_number=curr_set_number, 
                            weight=curr_weight, 
                            reps=s)
          curr_set.save()
          curr_set_number += 1
          curr_exercise.sets.add(curr_set)
        workout_exercises.append(curr_exercise)
        obj.exercises.add(curr_exercise)
        curr_exercise_number += 1
      if request.POST.get("save"):
        context["object"] = obj
        return redirect('workout_update', obj.pk)
      return redirect('workout_detail', obj.pk)

  return render(request, 'workout/update_workout.html', context)