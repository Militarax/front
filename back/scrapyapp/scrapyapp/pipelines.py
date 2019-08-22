from app.models import Profile


class scrapyappPipeline(object):

    def process_item(self, item, spider):

        prof = Profile(fullname=item.get('fullname'), nickname=item.get('nickname'), img=item.get('img'),
                       git_url=item.get('git_url'), repos=item.get('repos'), stars=item.get('stars'),
                       followers=item.get('followers'), location=item.get('location'), language=item.get('language'),
                       projects=item.get('projects'))

        a = Profile.objects.filter(nickname=prof.nickname, fullname=prof.fullname, language=prof.language)
        if len(a) == 0:
            prof.save()
        return item

