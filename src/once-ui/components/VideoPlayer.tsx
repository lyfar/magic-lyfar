"use client";

import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.scss";
import { Flex, Button, Text, Icon } from "./";
import classNames from "classnames";

interface VideoPlayerProps extends React.ComponentProps<typeof ReactPlayer> {
  src: string;
  className?: string;
  poster?: string;
  preload?: "none" | "metadata" | "auto";
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  className,
  poster,
  preload = "metadata",
  ...props
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReady = () => {
    setIsReady(true);
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setProgress(state.played * 100);
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    playerRef.current.seekTo(percentage);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

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

  const changePlaybackRate = () => {
    const rates = [0.5, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  return (
    <div
      ref={containerRef}
      className={classNames(styles.container, className)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={src}
        width="100%"
        height="100%"
        playing={isPlaying}
        volume={isMuted ? 0 : volume}
        playbackRate={playbackRate}
        onPlay={handlePlay}
        onPause={handlePause}
        onReady={handleReady}
        onProgress={handleProgress}
        onDuration={handleDuration}
        style={{ position: "absolute", top: 0, left: 0 }}
        config={{
          file: {
            attributes: {
              poster: poster,
              preload: preload,
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
      
      {/* Click overlay for play/pause */}
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

      {/* Central Play Icon - Always visible when not playing */}
      {!isPlaying && (
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

      {/* Controls */}
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
        {/* Progress bar */}
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

        {/* Control buttons */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={togglePlay}
              className={styles.controlButton}
            >
              <Icon name={isPlaying ? "pause" : "play"} size="m" />
            </button>
            <button
              onClick={toggleMute}
              className={styles.controlButton}
            >
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
            <button
              onClick={changePlaybackRate}
              className={styles.speedButton}
            >
              {playbackRate}x
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