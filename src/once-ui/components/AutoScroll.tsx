"use client";

import React, { useEffect, useRef, forwardRef } from "react";
import classNames from "classnames";
import { Flex } from "./Flex";
import styles from "./AutoScroll.module.scss";

interface AutoScrollProps {
  children: React.ReactNode;
  scrollDirection?: "horizontal" | "vertical";
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const AutoScroll = forwardRef<HTMLDivElement, AutoScrollProps>(
  ({ 
    children, 
    scrollDirection = "horizontal", 
    speed = 1, 
    pauseOnHover = true,
    className, 
    style
  }, ref) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();
    const isPausedRef = useRef(false);

    useEffect(() => {
      const scrollContainer = scrollRef.current;
      
      if (!scrollContainer) return;

      const scroll = () => {
        if (isPausedRef.current) {
          setTimeout(scroll, 16); // ~60fps
          return;
        }

        if (scrollDirection === "horizontal") {
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          
          if (maxScroll <= 0) {
            console.log("AutoScroll: Waiting for content to load...", {
              scrollWidth: scrollContainer.scrollWidth,
              clientWidth: scrollContainer.clientWidth
            });
            setTimeout(scroll, 16);
            return;
          }
          
          if (scrollContainer.scrollLeft >= maxScroll / 2) {
            console.log("AutoScroll: Resetting scroll position");
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += speed;
          }
        } else {
          const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
          
          if (maxScroll <= 0) {
            setTimeout(scroll, 16);
            return;
          }
          
          if (scrollContainer.scrollTop >= maxScroll / 2) {
            scrollContainer.scrollTop = 0;
          } else {
            scrollContainer.scrollTop += speed;
          }
        }

        setTimeout(scroll, 16); // ~60fps
      };

      // Start scrolling after content loads
      const timeoutId = setTimeout(scroll, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }, [scrollDirection, speed]);

    const handleMouseEnter = () => {
      if (pauseOnHover) {
        isPausedRef.current = true;
      }
    };

    const handleMouseLeave = () => {
      if (pauseOnHover) {
        isPausedRef.current = false;
      }
    };

    return (
      <Flex
        ref={ref}
        className={classNames(styles.container, className)}
        style={style}
      >
        <div
          ref={scrollRef}
          className={classNames(
            styles.scroller,
            styles[scrollDirection]
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div ref={contentRef} className={styles.content}>
            {children}
          </div>
        </div>
      </Flex>
    );
  }
);

AutoScroll.displayName = "AutoScroll";

export { AutoScroll };
export type { AutoScrollProps }; 