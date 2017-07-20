#!/usr/bin/env bash

cd ./notifications

echo "Building notifications service..."
docker build --pull -t notifications .

echo "Starting notfications service..."
docker run --rm  -p 8081:8081 -p 3000:3000 --name not notifications
