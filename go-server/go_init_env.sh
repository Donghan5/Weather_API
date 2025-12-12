#!/bin/bash

set -e

# Setting color for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Setting go mod${NC}"
if [ -f "go.mod" ]; then
	echo -e "${GREEN}go.mod already exists. Skipping creation.${NC}"
else
	go mod init weather_api
fi

echo -e "${GREEN}Downloading go dependencies${NC}"
if ! go mod tidy; then
	echo -e "${RED}Failed to download Go dependencies.${NC}"
	exit 1
fi
