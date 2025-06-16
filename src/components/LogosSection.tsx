'use client';

import React, { useRef, useEffect, useState } from "react";
import { Column, Flex, Text, SmartImage, IconButton, Fade } from "@/once-ui/components";
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
      paddingX="16"
      paddingY="12"
      radius="m"
      background="surface"
      border="neutral-medium"
      vertical="center"
      horizontal="center"
      style={{ 
        flexShrink: 0, 
        width: "160px",
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
    name: "Boiler Room",
    logoPath: "/images/companies-logos/boilerroom.png",
    alt: "Boiler Room Logo",
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
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      const scroller = scrollerRef.current;
      if (scroller) {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        const currentScroll = scroller.scrollLeft;
        
        // If we've reached the end, reset to beginning smoothly
        if (currentScroll >= maxScroll - 1) {
          scroller.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroller.scrollBy({ left: 1, behavior: 'smooth' });
        }
      }
    }, 50); // Adjust speed as needed

    return () => clearInterval(interval);
  }, [isAutoScrolling]);

  // Check scroll button visibility
  const updateScrollButtonsVisibility = () => {
    const scroller = scrollerRef.current;
    if (scroller) {
      const scrollPosition = scroller.scrollLeft;
      const maxScrollPosition = scroller.scrollWidth - scroller.clientWidth;
      const isScrollable = scroller.scrollWidth > scroller.clientWidth;

      setShowPrevButton(isScrollable && scrollPosition > 0);
      setShowNextButton(isScrollable && scrollPosition < maxScrollPosition - 1);
    }
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) {
      updateScrollButtonsVisibility();
      scroller.addEventListener("scroll", updateScrollButtonsVisibility);
      return () => scroller.removeEventListener("scroll", updateScrollButtonsVisibility);
    }
  }, []);

  const handleScrollNext = () => {
    const scroller = scrollerRef.current;
    if (scroller) {
      setIsAutoScrolling(false);
      scroller.scrollBy({ left: scroller.clientWidth / 2, behavior: "smooth" });
      // Resume auto-scroll after 3 seconds
      setTimeout(() => setIsAutoScrolling(true), 3000);
    }
  };

  const handleScrollPrev = () => {
    const scroller = scrollerRef.current;
    if (scroller) {
      setIsAutoScrolling(false);
      scroller.scrollBy({ left: -scroller.clientWidth / 2, behavior: "smooth" });
      // Resume auto-scroll after 3 seconds
      setTimeout(() => setIsAutoScrolling(true), 3000);
    }
  };

  const handleMouseEnter = () => {
    setIsAutoScrolling(false);
  };

  const handleMouseLeave = () => {
    setIsAutoScrolling(true);
  };

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
      
      <Flex fillWidth className={styles.scrollContainer} style={{ position: 'relative' }}>
        {showPrevButton && (
          <Fade
            base="page"
            position="absolute"
            padding="4"
            vertical="center"
            to="right"
            width={4}
            fillHeight
            left="0"
            zIndex={1}
          >
            <IconButton
              icon="chevronLeft"
              onClick={handleScrollPrev}
              size="s"
              variant="secondary"
              aria-label="Scroll Previous"
            />
          </Fade>
        )}
        
        <Flex
          ref={scrollerRef}
          className={styles.scrollingRow}
          gap="16"
          paddingX="20"
          direction="row"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            height: '120px',
            alignItems: 'center',
          }}
        >
          <Flex
            className={styles.personalLogo}
            paddingX="16"
            paddingY="12"
            radius="m"
            gap="8"
            vertical="center"
            horizontal="center"
            style={{ 
              flexShrink: 0, 
              width: "160px",
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
        </Flex>

        {showNextButton && (
          <Fade
            base="page"
            position="absolute"
            padding="4"
            vertical="center"
            horizontal="end"
            to="left"
            width={4}
            fillHeight
            right="0"
            zIndex={1}
          >
            <IconButton
              icon="chevronRight"
              onClick={handleScrollNext}
              size="s"
              variant="secondary"
              aria-label="Scroll Next"
            />
          </Fade>
        )}
      </Flex>
    </Column>
  );
}; 