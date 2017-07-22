import sys
import pathlib

from twisted.internet import reactor
from twisted.python import log
from twisted.web import server, resource, static

from autobahn.twisted import websocket, resource as autobahn_resource


WEB_DIR = pathlib.PosixPath(__file__).parent / 'web' / 'dist'
HTTP_PORT = 8081


class WebsocketServer(websocket.WebSocketServerProtocol):
    def onOpen(self):
        self.factory.register(self)

    def connectionLost(self, reason):
        self.factory.unregister(self)

    def onMessage(self, payload, isBinary):
        if payload:
            self.factory.communicate(self, payload, isBinary)


class Factory(websocket.WebSocketServerFactory):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.clients = {}

    def register(self, client):
        self.clients[client.peer] = client

    def unregister(self, client):
        self.clients.pop(client.peer)

    def communicate(self, client, payload, isBinary):
        for peer, c in self.clients.items():
            if not peer == client.peer:
                c.sendMessage(payload)


def main():
    log.startLogging(sys.stdout)

    root = static.File(WEB_DIR)
    factory = Factory(f'ws://0.0.0.0:{HTTP_PORT}')
    factory.protocol = WebsocketServer
    resource = autobahn_resource.WebSocketResource(factory)
    # websockets resource on '/ws' path
    root.putChild(b'ws', resource)

    reactor.listenTCP(HTTP_PORT,
                      server.Site(root),
                      interface='0.0.0.0')

    reactor.run()


if __name__ == '__main__':
    main()
