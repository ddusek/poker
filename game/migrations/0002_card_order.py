# Generated by Django 3.0.7 on 2020-08-04 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='order',
            field=models.IntegerField(default=0),
        ),
    ]
