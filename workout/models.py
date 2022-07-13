from time import time
from django.db import models
from users.models import User
from django.utils import timezone
from django.db.models.signals import pre_delete
from django.dispatch import receiver

class Workout(models.Model):
	name      = models.CharField(verbose_name=("Name"), max_length=50)
	exercises = models.ManyToManyField("Exercise", verbose_name=("Exercises"))
	user      = models.ForeignKey(User, verbose_name=("User"), on_delete=models.CASCADE)
	created   = models.DateTimeField(verbose_name=("Created"), editable=False)
	modified  = models.DateTimeField(verbose_name=("Last Modified"))

	def save(self, *args, **kwargs):
		if not self.id:
			self.created = timezone.localtime(timezone.now())
		self.modified  = timezone.localtime(timezone.now())
		return super(Workout, self).save(*args, **kwargs)
	
	def __str__(self):
		if self.name:
			return f"{self.name}, created: {self.created}" 
		return f"Created {self.created}"

	class Meta:
		ordering = ['-created']

@receiver(pre_delete, sender=Workout)
def pre_save_receiver(sender, instance, **kwargs):
  exercises = instance.exercises.all()
  for e in exercises:
    e.delete()


class Exercise(models.Model):
	exercise_number = models.IntegerField(verbose_name=("Exercise Number"))
	exercise_type   = models.ForeignKey("ExerciseType", verbose_name=("Exercise Type"), on_delete=models.CASCADE)
	sets            = models.ManyToManyField("Set", verbose_name=("Sets"))
	rpe             = models.IntegerField(verbose_name=("RPE"), blank=True)

	def __str__(self):
		return f"{self.exercise_number}"

	class Meta:
		ordering = ['exercise_number']

@receiver(pre_delete, sender=Exercise)
def pre_save_receiver(sender, instance, **kwargs):
  sets = instance.sets.all()
  for s in sets:
    s.delete()

class ExerciseType(models.Model):
	name        = models.CharField(verbose_name=("Exercise Name"), max_length=50)
	description = models.CharField(verbose_name=("Description"), max_length=500, blank=True)
	user        = models.ForeignKey(User, verbose_name=("User"), on_delete=models.CASCADE)

	def __str__(self):
			return self.name


class Set(models.Model):
	set_number = models.IntegerField(verbose_name=("Set Number"))
	weight     = models.IntegerField(verbose_name=("Weight"))
	reps       = models.IntegerField(verbose_name=("Reps"))

	def __str__(self):
			return f"{self.set_number}"

	class Meta:
		ordering = ['set_number']
