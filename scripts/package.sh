#!/bin/bash

echo "Packaging DrawIO Viewer for Linux..."

# Build the application first
./scripts/build.sh

# Package for different Linux formats
echo "Creating AppImage..."
npm run package:appimage

echo "Creating Snap package..."
npm run package:snap

echo "Packaging completed!" 