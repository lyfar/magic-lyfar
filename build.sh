#!/bin/bash

# Clean up any existing build files
rm -rf .next/cache

# Build the Next.js app
NEXT_TELEMETRY_DISABLED=1 next build

# Clean up cache after build
rm -rf .next/cache

echo "Build completed successfully!" 