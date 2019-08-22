from scrapy import Request
from scrapy.spiders import Spider
from .components.UrlBuilder import UrlBuilder


class GitHubSpider(Spider):
    name = 'myspider'
    start_urls = []

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.url_builder = UrlBuilder()
        self.filters = kwargs.get('filters')
        self.id = kwargs.get('id')
        self.location = kwargs.get('location')
        self.language = kwargs.get('language')

    def start_requests(self):
        yield self._generate_search_request()

    def parse(self, response):
        pass

    def parse_search_page(self, response):
        users = response.css("div.user-list-info")
        if len(users) == 0:
            return
        usernames = users.css('a::attr(href)').extract()
        for username in usernames:
            yield Request(url="https://github.com" + username, callback=self.parse_user)
        yield self._generate_search_request()

    def parse_user(self, response):
        for user in response.css(".h-card"):
            fullname = user.css(".p-name[ itemprop = name ]").xpath("text()").extract_first()
            nickname = user.css(".p-nickname[ itemprop = additionalName ]").xpath("text()").extract_first()
            img = user.css("a[ itemprop = image ] img::attr(src)").extract_first()
            repos = user.xpath('//span[@class="Counter hide-lg hide-md hide-sm"]/text()').getall()[0].strip()
            projects = user.xpath('//span[@class="Counter hide-lg hide-md hide-sm"]/text()').getall()[1].strip()
            stars = user.xpath('//span[@class="Counter hide-lg hide-md hide-sm"]/text()').getall()[2].strip()
            followers = user.xpath('//span[@class="Counter hide-lg hide-md hide-sm"]/text()').getall()[3].strip()

            yield {
                'fullname': fullname,
                'nickname': nickname,
                'img': img,
                'git_url': "https://github.com/" + nickname,
                'repos': repos,
                'stars': stars,
                'followers': followers,
                'projects': projects,
                'location': self.location,
                'language': self.language,
            }

    def _generate_search_request(self):
        url = self.url_builder.next_url('https://github.com/search', filters=self.filters)
        return Request(url, callback=self.parse_search_page)
