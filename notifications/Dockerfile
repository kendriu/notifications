FROM python:3.6.2-alpine3.6

WORKDIR /src

COPY requirements.txt requirements.txt

RUN  apk add --no-cache -t build-deps gcc musl-dev \
     && pip install --no-cache-dir -r requirements.txt \
     && apk del build-deps


COPY web /src/notifications/
WORKDIR /src/notifications/web
RUN apk add --no-cache -t build-deps nodejs-npm \
    && npm install \
    && npm run build \
    && rm -rf node_modules src \
    && apk del build-deps


WORKDIR /src
COPY . notifications

CMD ["python", "-m", "notifications"]
