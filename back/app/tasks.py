import time
from uuid import uuid4
import requests
from apps.celery import app


@app.task
def spider_cap(list_of_filters):
    for filters in list_of_filters:
        pid = str(uuid4())
        if filters['language'] == 'C4':
            data = {
                'project': 'scrapyapp',
                'spider': 'myspider',
                'jobid': pid,
                'filters': 'location:{0}+language:{1}'.format(filters['location'], 'C'),
                'language': 'C',
                'location': filters['location'],
            }
        else:
            data = {
                'project': 'scrapyapp',
                'spider': 'myspider',
                'jobid': pid,
                'filters': 'location:{0}+language:{1}'.format(filters['location'], filters['language']),
                'language': filters['language'],
                'location': filters['location'],
            }
        requests.post('http://localhost:6800/schedule.json', data=data)
        status = ''
        while(status != 'finished'):
            time.sleep(30)
            data_req = requests.get('http://localhost:6800/listjobs.json?project=scrapyapp')
            data_decoded = data_req.content.decode('utf-8')
            if data_decoded[data_decoded.find('finished'):].find(pid) != -1:
                status = 'finished'
            else:
                status = 'running'
