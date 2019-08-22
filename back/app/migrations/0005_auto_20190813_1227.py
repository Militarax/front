# Generated by Django 2.1.1 on 2019-08-13 09:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_profile_projects'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='followers',
            field=models.CharField(default=0, max_length=1000),
        ),
        migrations.AlterField(
            model_name='profile',
            name='img',
            field=models.CharField(max_length=1000),
        ),
        migrations.AlterField(
            model_name='profile',
            name='projects',
            field=models.CharField(default=0, max_length=1000),
        ),
        migrations.AlterField(
            model_name='profile',
            name='repos',
            field=models.CharField(default=0, max_length=1000),
        ),
        migrations.AlterField(
            model_name='profile',
            name='stars',
            field=models.CharField(default=0, max_length=1000),
        ),
    ]
