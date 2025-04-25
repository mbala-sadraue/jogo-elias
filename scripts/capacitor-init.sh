#!/bin/bash

# Initialize Capacitor if not already initialized
npx cap init ELONDA com.elonda.app

# Build the web app
echo "Building web app..."
npm run build

# Add Android and iOS platforms
echo "Adding Android platform..."
npx cap add android

echo "Adding iOS platform..."
npx cap add ios

echo "Capacitor initialization complete!"