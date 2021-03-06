# Generated by Django 2.1.1 on 2019-08-12 14:06

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.CharField(default=uuid.uuid4, max_length=1000, primary_key=True, serialize=False, unique=True)),
                ('fullname', models.CharField(max_length=150)),
                ('img', models.ImageField(upload_to='')),
                ('location', models.CharField(max_length=50)),
                ('language', models.CharField(max_length=20)),
                ('git_url', models.URLField()),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
