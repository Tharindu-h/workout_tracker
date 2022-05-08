# Generated by Django 4.0.4 on 2022-05-08 23:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('workout', '0004_alter_workout_options_remove_exercise_reps_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exercise',
            name='sets',
        ),
        migrations.AddField(
            model_name='set',
            name='exercise',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='workout.exercise', verbose_name='exercise'),
        ),
        migrations.RemoveField(
            model_name='set',
            name='weight',
        ),
        migrations.AddField(
            model_name='set',
            name='weight',
            field=models.ManyToManyField(to='workout.weight', verbose_name='weight'),
        ),
        migrations.RemoveField(
            model_name='workout',
            name='exercises',
        ),
        migrations.AddField(
            model_name='workout',
            name='exercises',
            field=models.ManyToManyField(to='workout.exercise', verbose_name='Exercises'),
        ),
    ]
