#!/bin/bash

# Build and sync the web app
echo "Building and syncing..."
bash scripts/capacitor-build.sh

# Open Android Studio
echo "Opening Android Studio..."
npx cap open android