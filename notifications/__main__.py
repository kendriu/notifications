import logging

from twisted.internet import reactor
from twisted.web import server, resource

from pubsub import net


PUB_SUB_PORT = 3000
HTTP_PORT = 8081


class Page(resource.Resource):
    isLeaf = True

    def render_GET(self, request):
        return "<html>Hello, world!</html>".encode()


def main():
    logging.basicConfig(level=logging.DEBUG)

    logging.info(f'Page will be running on port {HTTP_PORT}')
    reactor.listenTCP(HTTP_PORT,
                      server.Site(Page()),
                      interface='0.0.0.0')

    reactor.listenTCP(PUB_SUB_PORT,
                      net.PubSubFactory(),
                      interface='0.0.0.0')
    logging.info(f'PubSub will be running on port {PUB_SUB_PORT}')
    logging.info('Starting reactor...')
    reactor.run()


if __name__ == '__main__':
    main()
