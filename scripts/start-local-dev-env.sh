#!/usr/bin/env bash

echo "Starting dev environment"
docker compose -f docker-compose.yml -p bookshelf up -d