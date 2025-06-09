"use client";

import React from "react";
import styles from "./VideoPlayer.module.scss";
import { Flex } from "./Flex";
import classNames from "classnames";

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  className,
  ...props
}) => {
  return (
    <Flex
      radius="l"
      overflow="hidden"
      fillWidth
      className={classNames(styles.container, className)}
    >
      <video className={styles.video} controls autoPlay muted loop playsInline {...props}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Flex>
  );
}; 