#!/bin/bash

# Build and sync the web app
echo "Building and syncing..."
bash scripts/capacitor-build.sh

# Open Xcode
echo "Opening Xcode..."
npx cap open ios