"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.scss";
import { Flex, Button, Text, Icon, Skeleton } from "./";
import classNames from "classnames";

interface OptimizedVideoPlayerProps extends React.ComponentProps<typeof ReactPlayer> {
  src: string;
  webmSrc?: string;
  hdSrc?: string;
  mdSrc?: string;
  sdSrc?: string;
  poster?: string;
  className?: string;
  lazy?: boolean;
  quality?: "auto" | "hd" | "md" | "sd";
}

export const OptimizedVideoPlayer: React.FC<OptimizedVideoPlayerProps> = ({
  src,
  webmSrc,
  hdSrc,
  mdSrc,
  sdSrc,
  poster,
  className,
  lazy = true,
  quality = "auto",
  ...props
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [isLazyFading, setIsLazyFading] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasMetadata, setHasMetadata] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState(quality);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || shouldLoad) return;

         const observer = new IntersectionObserver(
       (entries) => {
         if (entries[0].isIntersecting) {
           setIsLazyFading(true);
           // Smooth transition before loading video
           setTimeout(() => {
             setShouldLoad(true);
           }, 200);
           observer.disconnect();
         }
       },
       { threshold: 0.1 }
     );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, shouldLoad]);

  // Auto-detect quality based on connection
  useEffect(() => {
    if (quality !== "auto") return;

    const connection = (navigator as any).connection;
    if (connection) {
      const effectiveType = connection.effectiveType;
      
      if (effectiveType === "4g" && hdSrc) {
        setSelectedQuality("hd");
      } else if (effectiveType === "3g" && mdSrc) {
        setSelectedQuality("md");
      } else if (sdSrc) {
        setSelectedQuality("sd");
      }
    }
  }, [quality, hdSrc, mdSrc, sdSrc]);

  const getOptimizedSrc = () => {
    // Prefer WebM if supported
    if (webmSrc && 'HTMLVideoElement' in window) {
      const video = document.createElement('video');
      if (video.canPlayType('video/webm')) {
        return webmSrc;
      }
    }

    // Select quality source
    switch (selectedQuality) {
      case "hd":
        return hdSrc || src;
      case "md":
        return mdSrc || src;
      case "sd":
        return sdSrc || src;
      default:
        return src;
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReady = () => {
    setIsReady(true);
    setIsBuffering(false);
    setHasMetadata(true);
    // Fade out skeleton after video is ready
    setTimeout(() => setShowSkeleton(false), 500);
  };

  const handleLoadStart = () => {
    setIsBuffering(true);
    setShowSkeleton(true);
  };
  
  const handleBuffer = () => setIsBuffering(true);
  
  const handleBufferEnd = () => {
    setIsBuffering(false);
    // Delay hiding skeleton for smooth transition
    setTimeout(() => setShowSkeleton(false), 300);
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setProgress(state.played * 100);
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (duration: number) => setDuration(duration);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    playerRef.current.seekTo(percentage);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(err => console.error('Error attempting to enable fullscreen:', err));
      }
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error('Error attempting to exit fullscreen:', err));
    }
  };

  const changeQuality = () => {
    const qualities = ["auto", "hd", "md", "sd"].filter(q => {
      if (q === "auto") return true;
      if (q === "hd") return hdSrc;
      if (q === "md") return mdSrc;
      if (q === "sd") return sdSrc;
      return false;
    });
    
    const currentIndex = qualities.indexOf(selectedQuality);
    const nextQuality = qualities[(currentIndex + 1) % qualities.length];
    setSelectedQuality(nextQuality as any);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  if (!shouldLoad) {
    return (
      <div
        ref={containerRef}
        className={classNames(styles.container, className)}
        style={{
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => {
          setIsLazyFading(true);
          setTimeout(() => setShouldLoad(true), 200);
        }}
      >
        {/* Skeleton background */}
        <div style={{
          opacity: isLazyFading ? 0.3 : 1,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          <Skeleton shape="block" />
        </div>
        
        {/* Play overlay */}
        <div 
          className={styles.loadingPlaceholder}
          style={{
            opacity: isLazyFading ? 0.5 : 1,
            transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className={styles.playIconButton}>
            <Icon name="play" size="m" />
          </div>
          <div style={{
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "12px",
            marginTop: "8px",
            fontFamily: "var(--font-family)",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
          }}>
            Click to load video
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={classNames(styles.container, className)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={getOptimizedSrc()}
        width="100%"
        height="100%"
        playing={isPlaying}
        volume={isMuted ? 0 : volume}
        playbackRate={playbackRate}
        onPlay={handlePlay}
        onPause={handlePause}
        onReady={handleReady}
        onLoadStart={handleLoadStart}
        onBuffer={handleBuffer}
        onBufferEnd={handleBufferEnd}
        onProgress={handleProgress}
        onDuration={handleDuration}
        style={{ position: "absolute", top: 0, left: 0 }}
        config={{
          file: {
            attributes: {
              preload: "metadata",
            }
          },
          youtube: {
            playerVars: {
              fs: 0 // Disable fullscreen button in YouTube player
            }
          },
          vimeo: {
            playerOptions: {
              fullscreen: false // Disable fullscreen button in Vimeo player
            }
          }
        }}
        {...props}
      />
      
      <div
        className={styles.clickOverlay}
        onClick={togglePlay}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: showControls ? "80px" : 0,
          zIndex: 1,
          cursor: "pointer",
          transition: "bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Skeleton loading while video is buffering */}
      {(isBuffering || showSkeleton) && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 3,
            borderRadius: "12px",
            overflow: "hidden",
            opacity: showSkeleton ? 1 : 0,
            transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Skeleton shape="block" />
        </div>
      )}

      {/* Play button - show when ready or when metadata is loaded */}
      {!isPlaying && (isReady || hasMetadata) && (
        <div
          className={styles.playIconOverlay}
          onClick={togglePlay}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            cursor: "pointer",
            opacity: !isPlaying ? 1 : 0,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <div className={styles.playIconButton}>
            <Icon name="play" size="m" />
          </div>
        </div>
      )}

      <div
        className={classNames(styles.controls, { [styles.controlsVisible]: showControls && isReady })}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(8px)",
          padding: "16px",
          transform: showControls && isReady ? "translateY(0)" : "translateY(calc(100% + 12px))",
          opacity: showControls && isReady ? 1 : 0,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <span style={{ 
            color: "white", 
            fontSize: "12px", 
            fontFamily: "var(--font-family)",
            minWidth: "35px" 
          }}>
            {formatTime(currentTime)}
          </span>
          <div
            onClick={handleSeek}
            style={{
              flex: 1,
              height: "4px",
              background: "rgba(255, 255, 255, 0.3)",
              borderRadius: "2px",
              cursor: "pointer",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "white",
                borderRadius: "2px",
                transition: "width 0.1s ease",
              }}
            />
          </div>
          <span style={{ 
            color: "white", 
            fontSize: "12px", 
            fontFamily: "var(--font-family)",
            minWidth: "35px" 
          }}>
            {formatTime(duration)}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={togglePlay} className={styles.controlButton}>
              <Icon name={isPlaying ? "pause" : "play"} size="m" />
            </button>
            <button onClick={toggleMute} className={styles.controlButton}>
              <Icon name={isMuted ? "volumeOff" : "volumeOn"} size="m" />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className={styles.volumeSlider}
            />
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button onClick={changeQuality} className={styles.speedButton}>
              {selectedQuality.toUpperCase()}
            </button>
            <button
              onClick={toggleFullscreen}
              className={styles.controlButton}
              aria-label="Toggle fullscreen"
            >
              <Icon name={isFullscreen ? "minimize" : "maximize"} size="m" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 