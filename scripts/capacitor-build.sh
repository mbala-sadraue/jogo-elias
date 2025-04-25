#!/bin/bash

# Build the web app
echo "Building web app..."
npm run build

# Sync changes with Capacitor
echo "Syncing with Capacitor..."
npx cap sync

echo "Capacitor build and sync complete!"