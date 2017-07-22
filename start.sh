#!/usr/bin/env bash

set -e
set -u

cd ./notifications

echo "Building notifications service..."
docker build --pull -f Dockerfile-dev -t notifications .

echo "Starting notifications service..."
docker run --rm  -p 8081:8081 --name notifications notifications
