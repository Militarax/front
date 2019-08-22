class UrlBuilder:
    page = 0

    def next_url(self, base_url, filters):
        self.page += 1
        return f"{base_url}?p={self.page}&q={filters}&type=Users"

