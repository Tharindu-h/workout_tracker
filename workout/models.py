from pyexpat import model
from django.db import models

class Exercise(models.Model):
  name        = models.CharField(max_length=70, verbose_name=('Name'))
  description = models.CharField(max_length=256, blank=True, null=True, verbose_name=('Description'))

  def __str__(self):
    return self.name

class Weight(models.Model):
  weight = models.IntegerField(default=0, verbose_name=('Weight'))  

  def __str__(self):
    return str(self.weight)

class Workout(models.Model):
  name        = models.CharField(max_length=70, verbose_name=('Name'))
  description = models.CharField(max_length=256, blank=True, null=True, verbose_name=('Description'))
  dateTime    = models.DateTimeField()
  exercises   = models.ManyToManyField('Exercise', verbose_name=('Exercises'))

  class Meta:
    ordering = ['-dateTime']
  
  def __str__(self):
    return self.name

class Set(models.Model):
  weight      = models.ManyToManyField("Weight", verbose_name=("weight"))
  exercise    = models.ForeignKey('Exercise', verbose_name=('exercise'), on_delete=models.CASCADE, null=True)
  reps        = models.IntegerField(default=0, verbose_name=('Number of Reps'))
  workout     = models.ForeignKey('Workout', verbose_name=('Workout'), on_delete=models.CASCADE, null=True)

  def __str__(self):
    return self.exercise.name +  "set of " + str(self.reps)
