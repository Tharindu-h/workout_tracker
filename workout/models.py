from pyexpat import model
from django.db import models

class Exercise(models.Model):
    name        = models.CharField(max_length=70, verbose_name=('Name'))
    description = models.CharField(max_length=256, blank=True, null=True, verbose_name=('Description'))
    sets        = models.IntegerField(default=0, verbose_name=('Number of Sets'))
    reps        = models.IntegerField(default=0, verbose_name=('Number of Reps'))
    weight      = models.ForeignKey('Weight', verbose_name=('Weight'), on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Weight(models.Model):
    weight = models.IntegerField(default=0, verbose_name=('Weight'))

    def __str__(self):
        return str(self.weight)

class Workout(models.Model):
    name        = models.CharField(max_length=70, verbose_name=('Name'))
    description = models.CharField(max_length=256, blank=True, null=True, verbose_name=('Description'))
    exercises   = models.ForeignKey('Exercise', verbose_name=('Exercises'), on_delete=models.CASCADE)

    def __str__(self):
        return self.name