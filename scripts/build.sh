#!/bin/bash

echo "Building DrawIO Viewer..."

# Clean previous build
npm run clean

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the application
echo "Building application..."
npm run build

echo "Build completed successfully!" 