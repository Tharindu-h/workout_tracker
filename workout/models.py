from pyexpat import model
from django.db import models

class Exercise(models.Model):
  name        = models.CharField(max_length=70, verbose_name=('Name'))
  description = models.CharField(max_length=256, blank=True, null=True, verbose_name=('Description'))
  set         = models.ManyToManyField('Set', related_name=('sets'))

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
  exercises   = models.ManyToManyField('Exercise', related_name=('exercises'))

  class Meta:
    ordering = ['-dateTime']
  
  def __str__(self):
    return self.name

class Set(models.Model):
  weight      = models.IntegerField(default=0, verbose_name=('Weight'))  
  reps        = models.IntegerField(default=0, verbose_name=('Number of Reps'))

  def __str__(self):
    return "Set of " + str(self.reps) + "at " + str(self.weight)
