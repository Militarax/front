from django.db import models
from django.contrib.postgres.fields import ArrayField
import uuid


class Profile(models.Model):
    id = models.CharField(primary_key=True, unique=True, default=uuid.uuid4, max_length=1000)
    fullname = models.CharField(max_length=150, null=True)
    nickname = models.CharField(max_length=32, null=True)
    img = models.CharField(max_length=1000)
    location = models.CharField(max_length=50)
    language = models.CharField(max_length=20)
    git_url = models.URLField()
    repos = models.CharField(default=0, max_length=1000)
    stars = models.CharField(default=0, max_length=1000)
    followers = models.CharField(default=0, max_length=1000)
    projects = models.CharField(default=0, max_length=1000)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.fullname is None:
            return self.nickname
        return self.fullname

    def to_dict(self):
        return {
            'fullname': self.fullname,
            'nickname': self.nickname,
            'img': self.img,
            'location': self.location,
            'language': self.language,
            'git_url': self.git_url,
            'stars': self.stars,
            'followers': self.followers,
            'repos': self.repos,
            'projects': self.projects,
        }
