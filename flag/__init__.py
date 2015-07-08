"""Main entry point
"""
from pyramid.config import Configurator


def main(global_config, **settings):
    config = Configurator(settings=settings)
    config.include("cornice")
    config.include('pyramid_chameleon')
    config.add_route('index', '/')
    config.add_static_view(name='static', path="flag:static")
    config.scan("flag.views")
    return config.make_wsgi_app()
