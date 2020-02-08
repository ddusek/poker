# Generated by Django 3.0.2 on 2020-02-08 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('current_player', models.IntegerField()),
                ('last_raise', models.IntegerField()),
                ('all_played', models.BooleanField()),
                ('game_over', models.BooleanField()),
                ('round_ended', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('chips', models.IntegerField()),
            ],
        ),
    ]
