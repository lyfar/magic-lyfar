"use client";

import React, { useEffect, useRef, useState } from "react";
import { Column, Flex, Text, SmartImage } from "@/once-ui/components";
import styles from "./TestimonialsColumn.module.scss";

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsColumnProps {
  testimonials: Testimonial[];
  duration: number;
  className?: string;
}

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className={styles.testimonialCard}>
    <Flex
      direction="column"
      gap="20"
      padding="32"
      radius="l"
      background="surface"
      border="neutral-alpha-weak"
      fillWidth
    >
      <Text 
        variant="body-default-m" 
        onBackground="neutral-medium"
        style={{ lineHeight: '1.6' }}
      >
        &ldquo;{testimonial.text}&rdquo;
      </Text>
      <Flex gap="12" vertical="center">
        <Flex 
          style={{ 
            width: '40px', 
            height: '40px',
            minWidth: '40px',
            minHeight: '40px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '50%'
          }}
        >
          <SmartImage
            src={testimonial.image}
            alt={testimonial.name}
            objectFit="cover"
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '100%'
            }}
            sizes="40px"
          />
        </Flex>
        <Column gap="2">
          <Text variant="label-default-s" onBackground="neutral-strong">
            {testimonial.name}
          </Text>
          <Text variant="body-default-xs" onBackground="neutral-weak">
            {testimonial.role}
          </Text>
        </Column>
      </Flex>
    </Flex>
  </div>
);

export const TestimonialsColumn: React.FC<TestimonialsColumnProps> = ({
  testimonials,
  duration,
  className,
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Triple the testimonials for smoother infinite scroll
  const tripleTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Dynamic duration: slower when in view, faster when out of view
  const dynamicDuration = isInView ? duration * 2.5 : duration * 0.4;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '50px', // Add some margin for smoother transitions
      }
    );

    const currentElement = containerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.columnWrapper} ${className || ''}`}
    >
      <div
        className={styles.testimonialsColumn}
        style={{
          animationDuration: `${dynamicDuration}s`,
        }}
      >
        {tripleTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}; 