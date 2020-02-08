# Generated by Django 3.0.2 on 2020-02-08 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poker_app', '0002_auto_20200208_1623'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='all_played',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='game',
            name='game_over',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='game',
            name='last_raise',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='game',
            name='round_ended',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='game',
            name='current_player',
            field=models.IntegerField(default=0),
        ),
    ]
