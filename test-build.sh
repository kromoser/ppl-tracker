#!/bin/bash
# Test script to verify the build works locally with GitHub Pages settings

echo "Testing build with GitHub Pages configuration..."
echo ""

# Set environment variables
export NODE_ENV=production
export GITHUB_PAGES=true

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf build .svelte-kit

# Create placeholder icons if missing
echo "Creating placeholder icons..."
node scripts/create-placeholder-icons.js

# Sync SvelteKit
echo "Syncing SvelteKit..."
npx svelte-kit sync

# Build
echo "Building..."
npm run build

# Check if build succeeded
if [ -d "build" ]; then
    echo ""
    echo "✓ Build successful!"
    echo "Build directory contents:"
    ls -la build/
    if [ -f "build/index.html" ]; then
        echo ""
        echo "✓ index.html found"
        echo ""
        echo "Build test PASSED"
    else
        echo ""
        echo "✗ ERROR: index.html not found in build/"
        exit 1
    fi
else
    echo ""
    echo "✗ ERROR: build directory was not created!"
    exit 1
fi
