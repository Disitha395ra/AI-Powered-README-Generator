#!/usr/bin/env bash
# Move into the server folder, install deps and start the app
cd server || exit 1

# Install dependencies (Railway may have already installed but this ensures it)
npm install

# Start app (this uses the package.json "start" script inside server/)
npm start
