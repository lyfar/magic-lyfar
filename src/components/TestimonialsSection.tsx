"use client";

import React from "react";
import { Column, Flex, Text, Row, RevealFx, Badge } from "@/once-ui/components";
import { TestimonialsColumn } from "./TestimonialsColumn";
import styles from "./TestimonialsSection.module.scss";

const testimonials = [
  {
    text: "Egor has solid project management skills. He is professional, reliable and aims at delivering a perfect product for his client. He is creative and a good listener, he has strong eye for detail and make relevant suggestions to elevate further the project.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    name: "Tatiana Delannoy",
    role: "Head of Marketing, Chanel Fashion",
  },
  {
    text: "I worked with Egor on a video for Sassy Hong Kong in which he did the videography, video editing and graphics for a client project. He was a pleasure to work with, had loads of creative ideas, was quick to respond and went above and beyond what was expected.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Daisy Costello",
    role: "Art Director, Sassy Media Group",
  },
  {
    text: "I worked with Egor on an internal brand training video and it's a pleasure working with him. He understood our needs and purpose very well and come up with a lot of creative ideas for the execution. The result is beyond expectation and our team really love it!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Alvis Choi",
    role: "Marketing Manager, Swire Hotels",
  },
  {
    text: "Super talented artist! Thank you so much for the video, I was impressed by Egor's strong eye for details in capturing the atmosphere. He was also really creative with great ideas, was able to understand our needs, and transformed the message that we wanted to deliver to our audience in visual.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Zachary Koo",
    role: "Asia-Pacific Marketing Manager, Groupe Beneteau",
  },
  {
    text: "I had a chance to collaborate with Egor on some video projects. He understood my needs and my creative directions very clearly and made a video that was above my expectations. I recommend him 100%.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Ophelia Jacarini",
    role: "Artist",
  },
  {
    text: "We are extremely pleased with his professional, tasteful and above all stylish videos. All of our instructions and post event comments/corrections were taken into account and the end result definitely exceeded all of our expectations.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    name: "Marina Hoyle",
    role: "HR Director, Matthew Hoyle Int.",
  },
  {
    text: "Thank you so much for the video! Like the MOVIE REEL!! U living a Movie.. U lucky Bloke! Thank you Egor for spending the time!!!",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
    name: "Sally Yeh",
    role: "Singer & Actress",
  },
  {
    text: "Egor is a very talented and creative professional making excellent videos with modern cuts and incredible zooms. Egor knows how to capture movement and atmosphere. Great job!",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    name: "Olga Neklyudova",
    role: "Strategy & Transformation Consultant",
  },
  {
    text: "I worked with Egor on a commercial photoshoot. He was great, efficient and reliable. Creative minded and open to discussion. Results came out great.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "Pierre Dal Corso",
    role: "Fashion Photographer",
  },
  {
    text: "Creative, fun and fast. Great to work with!",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    name: "Simon Van Damme",
    role: "Manager, Marie France van Dam",
  },
  {
    text: "It was always a pleasure to work and collaborate with Egor. A very artistic vision and we could achieve amazing project and really cool video that people still talking about. Can't wait always for the next project.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face",
    name: "Gaël Majchrzak",
    role: "Chef, Sweet Fashion House",
  },
];

// Create different starting points for each column to create variety
// With 11 testimonials, we can distribute them more evenly
const firstColumn = [...testimonials.slice(0, 6)];
const secondColumn = [...testimonials.slice(4, 10)];
const thirdColumn = [...testimonials.slice(7, 11), ...testimonials.slice(0, 3)];

export const TestimonialsSection: React.FC = () => {
  return (
    <Column fillWidth gap="48" paddingY="64">
      <Column fillWidth horizontal="center">
        <RevealFx fillWidth paddingBottom="16">
          <Flex fillWidth horizontal="center">
            <Badge 
              background="brand-alpha-weak" 
              paddingX="12" 
              paddingY="4" 
              onBackground="brand-strong" 
              textVariant="label-default-s"
            >
              Testimonials
            </Badge>
          </Flex>
        </RevealFx>
        <RevealFx translateY="4" fillWidth paddingBottom="16">
          <Text 
            variant="display-strong-l" 
            onBackground="neutral-strong"
            align="center"
          >
            What clients say
          </Text>
        </RevealFx>
        <RevealFx translateY="8" delay={0.2} fillWidth>
          <Text 
            variant="body-default-l" 
            onBackground="neutral-weak"
            align="center"
          >
            Trusted by startups and enterprises alike for creative, video and tech production
          </Text>
        </RevealFx>
      </Column>

      <div className={styles.testimonialsContainer}>
        <TestimonialsColumn testimonials={firstColumn} duration={25} />
        <TestimonialsColumn testimonials={secondColumn} className={styles.hiddenOnMobile} duration={30} />
        <TestimonialsColumn testimonials={thirdColumn} className={styles.hiddenOnTablet} duration={28} />
      </div>
    </Column>
  );
}; 