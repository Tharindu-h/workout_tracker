from django.db import models
from users.models import User

class Exercise(models.Model):
  name        = models.CharField(max_length=70, verbose_name=('Name'))
  description = models.CharField(max_length=256, blank=True, null=True, verbose_name=('Description'))

  def __str__(self):
    return self.name

class Workout(models.Model):
  name        = models.CharField(max_length=70, verbose_name=('Name'))
  description = models.CharField(max_length=256, blank=True, null=True, verbose_name=('Description'))
  dateTime    = models.DateTimeField()
  exercises   = models.ManyToManyField('Exercise', related_name=('exercises'))
  user        = models.ForeignKey(User, verbose_name=('User'), on_delete=models.CASCADE)

  class Meta:
    ordering = ['-dateTime']
  
  def __str__(self):
    return self.name

class Set(models.Model):
  weight      = models.IntegerField(default=0, verbose_name=('Weight'))  
  reps        = models.IntegerField(default=0, verbose_name=('Number of Reps'))
  exercise    = models.ForeignKey(Exercise, on_delete=models.CASCADE)
  workout     = models.ForeignKey(Workout, on_delete=models.CASCADE)

  def __str__(self):
    return self.workout.name + " " + self.exercise.name
