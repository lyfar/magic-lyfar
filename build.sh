#!/bin/bash

# Remove only webpack cache before build to keep other .next metadata
if [ -d .next/cache/webpack ]; then
  rm -rf .next/cache/webpack
fi

# Build the Next.js app
NEXT_TELEMETRY_DISABLED=1 next build

# Remove webpack cache after build
if [ -d .next/cache/webpack ]; then
  rm -rf .next/cache/webpack
fi

echo "Build completed successfully!"