# Generated by Django 4.0.6 on 2022-08-04 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workout', '0011_auto_20220726_1625'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='exercise',
            name='rpe',
        ),
        migrations.AddField(
            model_name='exercise',
            name='lsrpe',
            field=models.IntegerField(blank=True, null=True, verbose_name='LSRPE'),
        ),
    ]
