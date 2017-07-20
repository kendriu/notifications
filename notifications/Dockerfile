FROM python:3.6.2-alpine3.6

WORKDIR /src

COPY requirements.txt requirements.txt
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN  apk add --update -t build-deps git gcc musl-dev nodejs-npm \
     && pip install --no-cache-dir -r requirements.txt \
     && npm install --only=production \
     && apk del build-deps \
     && rm -rf /var/cache/apk/*

COPY . notifications

CMD ["python", "-m", "notifications"]
