# Generated by Django 2.1.1 on 2019-08-13 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_auto_20190812_1734'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='projects',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
