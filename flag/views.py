from __future__ import unicode_literals, print_function
"""The REST server that gets a list of flags
"""
from bs4 import BeautifulSoup
from collections import OrderedDict
from cornice import Service
from cornice.resource import resource, view
from pyramid.view import view_config
import requests


@view_config(route_name='index', renderer='flag:templates/flag.pt',
             http_cache=365*24*60*60)
def index_view(request):
    # A static view of index.html
    return {}

@resource(collection_path='/flags', path='/flags/{page}')
class User(object):
    BASE = 'https://www.govt.nz'
    FLAGS = '/browse/engaging-with-government/the-nz-flag-your-chance-to'\
            '-decide/gallery/?start={page}'
    def __init__(self, request):
        self.request = request

    def get_flags(self, page=0):
        url = ''.join((self.BASE, self.FLAGS.format(page=page)))
        res = requests.get(url)
        soup = BeautifulSoup(res.text, 'html.parser')
        flagElements = soup.find_all(attrs={'class': 'flag'})

        retval = []
        for elem in flagElements:
            flag = OrderedDict()
            flag['url'] = ''.join((self.BASE, elem.find('img')['src']))
            flag['title'] = elem.find(attrs={'class': 'flag-title'}).string.strip()
            flag['submitter'] = elem.find(attrs={'class': 'flag-submitter'}).string.strip()
            retval.append(flag)
        return retval

    def collection_get(self):
        flags = self.get_flags()
        return {'flags': flags}

    @view(renderer='json')
    def get(self):
        page = self.request.matchdict['page']
        flags = self.get_flags(page)
        return {'flags': flags}
