#!/bin/bash

set -e

# Setting color for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

if [ "$(docker ps -q -f name=weather_redis)" ]; then
	echo -e "${GREEN}Redis container is already running.${NC}"
	exit 0
fi

docker rm -f weather_redis 2>/dev/null || true

echo -e "${GREEN}Starting Redis container...${NC}"
if docker run --name weather_redis -p 6379:6379 -d redis; then
    echo -e "${GREEN}Redis container started successfully!${NC}"
else
    echo -e "${RED}Failed to start Redis container.${NC}"
    exit 1
fi