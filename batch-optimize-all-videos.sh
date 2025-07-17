#!/bin/bash

# Batch Video Optimization Script for Magic Lyfar Portfolio
# This script will optimize all M4V and MOV files in the current directory

echo "🎬 Starting batch video optimization..."

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg not found. Installing with Homebrew..."
    brew install ffmpeg
fi

# Create output directory
mkdir -p optimized-videos

# Initialize counters
total_files=0
processed_files=0
total_original_size=0
total_compressed_size=0

# Count total files first
for video in *.m4v *.mov; do
    if [[ -f "$video" ]]; then
        ((total_files++))
    fi
done

echo "📊 Found $total_files video files to process"
echo ""

# Process each video file
for video in *.m4v *.mov; do
    if [[ -f "$video" ]]; then
        filename="${video%.*}"
        ((processed_files++))
        
        echo "[$processed_files/$total_files] 🎯 Processing: $video"
        
        # Get original file size
        original_size=$(stat -f%z "$video" 2>/dev/null || stat -c%s "$video" 2>/dev/null)
        total_original_size=$((total_original_size + original_size))
        
        # 1. Main compressed MP4 (optimized for web)
        echo "  📦 Creating compressed MP4..."
        ffmpeg -i "$video" \
          -c:v libx264 -crf 23 -preset slow \
          -c:a aac -b:a 128k \
          -vf "scale=1920:1080" \
          -movflags +faststart \
          "optimized-videos/${filename}-compressed.mp4" \
          -y -loglevel error
        
        # 2. WebM version (best compression)
        echo "  🕸️ Creating WebM version..."
        ffmpeg -i "$video" \
          -c:v libvpx-vp9 -crf 30 -b:v 2M \
          -c:a libopus -b:a 128k \
          -vf "scale=1920:1080" \
          "optimized-videos/${filename}-compressed.webm" \
          -y -loglevel error
        
        # 3. HD version (1080p)
        echo "  📺 Creating HD version..."
        ffmpeg -i "$video" \
          -c:v libx264 -crf 23 -preset slow \
          -vf "scale=1920:1080" -r 30 \
          -c:a aac -b:a 128k \
          -movflags +faststart \
          "optimized-videos/${filename}-hd.mp4" \
          -y -loglevel error
        
        # 4. MD version (720p)
        echo "  📱 Creating MD version..."
        ffmpeg -i "$video" \
          -c:v libx264 -crf 25 -preset slow \
          -vf "scale=1280:720" -r 30 \
          -c:a aac -b:a 96k \
          -movflags +faststart \
          "optimized-videos/${filename}-md.mp4" \
          -y -loglevel error
        
        # 5. SD version (480p)
        echo "  📟 Creating SD version..."
        ffmpeg -i "$video" \
          -c:v libx264 -crf 28 -preset slow \
          -vf "scale=854:480" -r 24 \
          -c:a aac -b:a 64k \
          -movflags +faststart \
          "optimized-videos/${filename}-sd.mp4" \
          -y -loglevel error
        
        # 6. Extract poster frame
        echo "  🖼️ Creating poster frame..."
        ffmpeg -i "$video" \
          -ss 00:00:02.000 -vframes 1 \
          "optimized-videos/${filename}-poster.jpg" \
          -y -loglevel error
        
        # Calculate compression savings
        compressed_size=$(stat -f%z "optimized-videos/${filename}-compressed.mp4" 2>/dev/null || stat -c%s "optimized-videos/${filename}-compressed.mp4" 2>/dev/null)
        total_compressed_size=$((total_compressed_size + compressed_size))
        
        original_mb=$((original_size / 1024 / 1024))
        compressed_mb=$((compressed_size / 1024 / 1024))
        savings_percent=$(( (original_size - compressed_size) * 100 / original_size ))
        
        echo "  ✅ $video: ${original_mb}MB → ${compressed_mb}MB (${savings_percent}% savings)"
        echo ""
    fi
done

# Calculate total savings
total_original_mb=$((total_original_size / 1024 / 1024))
total_compressed_mb=$((total_compressed_size / 1024 / 1024))
total_savings_percent=$(( (total_original_size - total_compressed_size) * 100 / total_original_size ))

echo "🎉 Batch optimization complete!"
echo ""
echo "📊 Summary:"
echo "  Files processed: $processed_files"
echo "  Total original size: ${total_original_mb}MB"
echo "  Total compressed size: ${total_compressed_mb}MB"
echo "  Total savings: ${total_savings_percent}% ($(( total_original_mb - total_compressed_mb ))MB)"
echo ""
echo "📁 All optimized files are in: ./optimized-videos/"
echo ""
echo "🚀 Next steps:"
echo "1. Upload optimized videos to your CDN (portfolio.lyfar.com)"
echo "2. Update your MDX files with new video URLs"
echo "3. Test loading speeds on different connection types"
echo ""
echo "📝 Example MDX frontmatter for each video:"
echo "video: \"https://portfolio.lyfar.com/[filename]-compressed.mp4\""
echo "videoWebm: \"https://portfolio.lyfar.com/[filename]-compressed.webm\""
echo "videoHD: \"https://portfolio.lyfar.com/[filename]-hd.mp4\""
echo "videoMD: \"https://portfolio.lyfar.com/[filename]-md.mp4\""
echo "videoSD: \"https://portfolio.lyfar.com/[filename]-sd.mp4\""
echo "poster: \"https://portfolio.lyfar.com/[filename]-poster.jpg\"" 