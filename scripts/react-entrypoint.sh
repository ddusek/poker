#!/usr/bin/env bash

cd frontend/ || exit

# Install node packages
echo "Install node packages"
npm i

# Run dev server
echo "Run dev server"
npm run dev