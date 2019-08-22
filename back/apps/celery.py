import os
from celery import Celery
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'apps.settings')
django.setup()
app = Celery('apps')
app.config_from_object('django.conf:settings')

app.autodiscover_tasks()

