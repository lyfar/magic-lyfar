"use client";

import React from "react";
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
        "{testimonial.text}"
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
  // Triple the testimonials for smoother infinite scroll
  const tripleTestimonials = [...testimonials, ...testimonials, ...testimonials];
  
  return (
    <div className={`${styles.columnWrapper} ${className || ''}`}>
      <div 
        className={styles.testimonialsColumn}
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        {tripleTestimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}; 