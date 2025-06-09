'use client';

import React, { useRef, useEffect, useState } from "react";
import { Column, Flex, Text, Row, SmartImage } from "@/once-ui/components";
import { Logo } from "@/components/Logo";
import styles from './LogosSection.module.scss';

interface ClientLogoProps {
  name: string;
  logoPath: string;
  alt: string;
}

const ClientLogo: React.FC<ClientLogoProps> = ({ name, logoPath, alt }) => {
  return (
    <Flex
      className={styles.clientLogo}
      paddingX="20"
      paddingY="16"
      radius="m"
      background="surface"
      border="neutral-medium"
      vertical="center"
      horizontal="center"
      style={{ 
        flexShrink: 0, 
        minWidth: "160px",
        height: "80px",
      }}
    >
      <SmartImage
        src={logoPath}
        alt={alt}
        objectFit="contain"
        unoptimized={true}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Flex>
  );
};

const clientLogos: ClientLogoProps[] = [
  {
    name: "Surprise Surprise",
    logoPath: "/images/companies-logos/surprise-surprise-color.png",
    alt: "Surprise Surprise Logo",
  },
  {
    name: "Swire",
    logoPath: "/images/companies-logos/swire-vector-black.png",
    alt: "Swire Logo",
  },
  {
    name: "Dining Concept",
    logoPath: "/images/companies-logos/dining-concept-color.png",
    alt: "Dining Concept Logo",
  },
  {
    name: "English",
    logoPath: "/images/companies-logos/english-logo-color.png",
    alt: "English Logo",
  },
  {
    name: "Lagoon",
    logoPath: "/images/companies-logos/lagoon-logo-white.png",
    alt: "Lagoon Logo",
  },
  {
    name: "MFVD",
    logoPath: "/images/companies-logos/MFVD-White.webp",
    alt: "MFVD Logo",
  },
  {
    name: "Chanel",
    logoPath: "/images/companies-logos/chanel-black.png",
    alt: "Chanel Logo",
  },
  {
    name: "Sassy",
    logoPath: "/images/companies-logos/sassy-black.webp",
    alt: "Sassy Logo",
  },
  {
    name: "Balenciaga",
    logoPath: "/images/companies-logos/Balenciaga-black.png",
    alt: "Balenciaga Logo",
  },
  {
    name: "Forbes",
    logoPath: "/images/companies-logos/Forbes-logo-black.png",
    alt: "Forbes Logo",
  },
  {
    name: "Oddity",
    logoPath: "/images/companies-logos/oddity-black.webp",
    alt: "Oddity Logo",
  },
  {
    name: "Tatler",
    logoPath: "/images/companies-logos/tatler-white.png",
    alt: "Tatler Logo",
  },
  {
    name: "10 Logo",
    logoPath: "/images/companies-logos/10-design.png",
    alt: "10 Logo",
  },
  {
    name: "Egis Company",
    logoPath: "/images/companies-logos/egis_company_white.png",
    alt: "Egis Company Logo",
  },
];

export const LogosSection: React.FC = () => {
  const scrollingRowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [startTranslate, setStartTranslate] = useState(0);

  useEffect(() => {
    const row = scrollingRowRef.current;
    if (!row) return;

    let resumeTimer: NodeJS.Timeout;

    const resumeAnimation = () => {
      if (row) {
        row.classList.remove('dragging');
        // Reset transform to let CSS animation take over
        row.style.transform = '';
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.clientX);
      
      // Get current transform value
      const computedStyle = window.getComputedStyle(row);
      const matrix = new DOMMatrix(computedStyle.transform);
      setCurrentTranslate(matrix.m41); // m41 is translateX
      setStartTranslate(matrix.m41);
      
      row.classList.add('dragging');
      clearTimeout(resumeTimer);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const deltaX = e.clientX - startX;
      const newTranslate = startTranslate + deltaX;
      setCurrentTranslate(newTranslate);
      
      if (row) {
        row.style.transform = `translateX(${newTranslate}px)`;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // Resume animation after 2 seconds of inactivity
      resumeTimer = setTimeout(resumeAnimation, 2000);
    };

    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false);
        resumeTimer = setTimeout(resumeAnimation, 2000);
      }
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      
      const computedStyle = window.getComputedStyle(row);
      const matrix = new DOMMatrix(computedStyle.transform);
      setCurrentTranslate(matrix.m41);
      setStartTranslate(matrix.m41);
      
      row.classList.add('dragging');
      clearTimeout(resumeTimer);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const deltaX = e.touches[0].clientX - startX;
      const newTranslate = startTranslate + deltaX;
      setCurrentTranslate(newTranslate);
      
      if (row) {
        row.style.transform = `translateX(${newTranslate}px)`;
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      resumeTimer = setTimeout(resumeAnimation, 2000);
    };

    // Add event listeners
    row.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    row.addEventListener('mouseleave', handleMouseLeave);
    
    row.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      row.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      row.removeEventListener('mouseleave', handleMouseLeave);
      row.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(resumeTimer);
    };
  }, [isDragging, startX, startTranslate]);

  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <Column fillWidth gap="24" paddingY="32">
      <Flex fillWidth horizontal="center" paddingX="20">
        <Text 
          variant="label-default-s" 
          onBackground="neutral-weak"
          style={{ textAlign: "center" }}
        >
          Trusted by Leading Brands
        </Text>
      </Flex>
      
      <div className={styles.scrollContainer}>
        <Row 
          ref={scrollingRowRef}
          className={styles.scrollingRow}
          gap="24" 
          paddingX="20"
        >
          <Flex
            className={styles.personalLogo}
            paddingX="20"
            paddingY="16"
            radius="m"
            gap="8"
            vertical="center"
            horizontal="center"
            style={{ 
              flexShrink: 0, 
              minWidth: "160px",
              height: "80px"
            }}
          >
            <Logo width={40} height={20} />
            <Text variant="label-default-s" onBackground="brand-strong">
              Lyfar Studio
            </Text>
          </Flex>
          
          {duplicatedLogos.map((logo, index) => (
            <ClientLogo
              key={`${logo.name}-${index}`}
              name={logo.name}
              logoPath={logo.logoPath}
              alt={logo.alt}
            />
          ))}
        </Row>
      </div>
    </Column>
  );
}; 