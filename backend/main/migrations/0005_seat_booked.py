# Generated by Django 5.0.4 on 2024-05-06 08:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_event_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='seat',
            name='booked',
            field=models.BooleanField(default=False),
        ),
    ]
