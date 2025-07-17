#!/bin/bash

# Balenciaga Video Compression Script
# This script will compress the 33MB Balenciaga video to multiple optimized versions

echo "🎬 Starting Balenciaga video compression..."
echo "Original file: balenciaga-final.m4v (33MB)"

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg not found. Installing with Homebrew..."
    brew install ffmpeg
fi

# Create output directory
mkdir -p compressed-videos

# 1. Main compressed version (target: 8-12MB)
echo "📦 Creating main compressed version..."
ffmpeg -i balenciaga-final.m4v \
  -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 128k \
  -vf "scale=1920:1080" \
  -movflags +faststart \
  compressed-videos/balenciaga-compressed.mp4

# 2. WebM version (best compression)
echo "🕸️ Creating WebM version..."
ffmpeg -i balenciaga-final.m4v \
  -c:v libvpx-vp9 -crf 30 -b:v 2M \
  -c:a libopus -b:a 128k \
  -vf "scale=1920:1080" \
  compressed-videos/balenciaga-compressed.webm

# 3. HD version (1080p)
echo "📺 Creating HD version..."
ffmpeg -i balenciaga-final.m4v \
  -c:v libx264 -crf 23 -preset slow \
  -vf "scale=1920:1080" -r 30 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  compressed-videos/balenciaga-hd.mp4

# 4. MD version (720p)
echo "📱 Creating MD version..."
ffmpeg -i balenciaga-final.m4v \
  -c:v libx264 -crf 25 -preset slow \
  -vf "scale=1280:720" -r 30 \
  -c:a aac -b:a 96k \
  -movflags +faststart \
  compressed-videos/balenciaga-md.mp4

# 5. SD version (480p)
echo "📟 Creating SD version..."
ffmpeg -i balenciaga-final.m4v \
  -c:v libx264 -crf 28 -preset slow \
  -vf "scale=854:480" -r 24 \
  -c:a aac -b:a 64k \
  -movflags +faststart \
  compressed-videos/balenciaga-sd.mp4

# 6. Extract poster frame
echo "🖼️ Creating poster frame..."
ffmpeg -i balenciaga-final.m4v \
  -ss 00:00:02.000 -vframes 1 \
  compressed-videos/balenciaga-poster.jpg

# Show file sizes
echo ""
echo "✅ Compression complete! File sizes:"
echo "📁 Original: $(du -h balenciaga-final.m4v | cut -f1)"
echo "📁 Compressed MP4: $(du -h compressed-videos/balenciaga-compressed.mp4 | cut -f1)"
echo "📁 WebM: $(du -h compressed-videos/balenciaga-compressed.webm | cut -f1)"
echo "📁 HD: $(du -h compressed-videos/balenciaga-hd.mp4 | cut -f1)"
echo "📁 MD: $(du -h compressed-videos/balenciaga-md.mp4 | cut -f1)"
echo "📁 SD: $(du -h compressed-videos/balenciaga-sd.mp4 | cut -f1)"

echo ""
echo "🚀 Next steps:"
echo "1. Upload compressed videos to your CDN"
echo "2. Update balenciaga-edoardo-tocco.mdx with new video URLs"
echo "3. Test loading speeds"

echo ""
echo "📝 Example MDX frontmatter:"
echo "video: \"https://portfolio.lyfar.com/balenciaga-compressed.mp4\""
echo "videoWebm: \"https://portfolio.lyfar.com/balenciaga-compressed.webm\""
echo "videoHD: \"https://portfolio.lyfar.com/balenciaga-hd.mp4\""
echo "videoMD: \"https://portfolio.lyfar.com/balenciaga-md.mp4\""
echo "videoSD: \"https://portfolio.lyfar.com/balenciaga-sd.mp4\""
echo "poster: \"https://portfolio.lyfar.com/balenciaga-poster.jpg\"" 