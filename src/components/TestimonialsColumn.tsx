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
        &quot;{testimonial.text}&quot;
      </Text>
      <Flex gap="12" vertical="center">
        <SmartImage
          src={testimonial.image}
          alt={testimonial.name}
          aspectRatio="1"
          objectFit="cover"
          radius="full"
          style={{ width: '40px', height: '40px' }}
          sizes="40px"
        />
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