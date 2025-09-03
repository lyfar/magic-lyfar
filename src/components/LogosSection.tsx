'use client';

import React, { useState, useRef, useEffect } from "react";
import { Column, Flex, Text, SmartImage, Button, useTheme } from "@/once-ui/components";
import { Logo } from "@/components/Logo";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ClientLogoProps {
  name: string;
  logoPath: string;
  alt: string;
}

const ClientLogo: React.FC<ClientLogoProps> = ({ name, logoPath, alt }) => {
  const { resolvedTheme } = useTheme();
  
  // Proper theme-responsive colors: black in light, white in dark
  const logoFilter = resolvedTheme === 'dark' 
    ? 'brightness(0) invert(1)' // Pure white #FFF in dark theme
    : 'brightness(0)'; // Pure black #000 in light theme
  
  return (
    <Flex
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
        key={`${logoPath}-${resolvedTheme}`} // Force re-render on theme change
        src={logoPath}
        alt={alt}
        objectFit="contain"
        unoptimized={true}
        style={{
          width: '100%',
          height: '100%',
          filter: logoFilter,
          opacity: '0.8',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.8';
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
  {
    name: "Baileys",
    logoPath: "/images/companies-logos/Baileys-Symbol.png",
    alt: "Baileys Logo",
  },
];

export const LogosSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  // Auto-scroll effect with smooth looping
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollSpeed = 1.5; // Slightly faster, smoother speed
    let animationId: number;

    const animate = () => {
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;

        // Check if we're near the end (leave some buffer for smooth transition)
        const threshold = scrollWidth - clientWidth - 200; // 200px buffer

        if (scrollLeft >= threshold) {
          // Instead of instant reset, smoothly scroll back to start
          container.scrollTo({
            left: scrollLeft - (scrollWidth / 2), // Jump back halfway to maintain momentum
            behavior: 'instant' // Instant for seamless loop
          });
        } else {
          // Normal scroll
          container.scrollBy({ left: scrollSpeed, behavior: 'auto' });
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAutoScrolling]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      setIsAutoScrolling(false);
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      // Resume auto-scroll after manual interaction with longer delay
      setTimeout(() => setIsAutoScrolling(true), 5000);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      setIsAutoScrolling(false);
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      // Resume auto-scroll after manual interaction with longer delay
      setTimeout(() => setIsAutoScrolling(true), 5000);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
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
      
      <div style={{ 
        width: '100%', 
        position: 'relative'
      }}>
        {/* Left Arrow */}
        <Button
          variant="tertiary"
          size="m"
          onClick={scrollLeft}
          style={{
            position: 'absolute',
            left: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            opacity: canScrollLeft ? 1 : 0.3,
            pointerEvents: canScrollLeft ? 'auto' : 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronLeft size={20} />
        </Button>

        {/* Right Arrow */}
        <Button
          variant="tertiary"
          size="m"
          onClick={scrollRight}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            opacity: canScrollRight ? 1 : 0.3,
            pointerEvents: canScrollRight ? 'auto' : 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronRight size={20} />
        </Button>

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
          style={{ 
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '0 60px'
          }}
          className="scrollbar-hide"
        >
          {/* First set of logos */}
          <Flex
            paddingX="16"
            paddingY="12"
            radius="m"
            background="surface"
            border="neutral-medium"
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
          
                    {clientLogos.map((logo, index) => (
            <ClientLogo
              key={`${logo.name}-${index}`}
              name={logo.name}
              logoPath={logo.logoPath}
              alt={logo.alt}
            />
          ))}

          {/* Duplicate set for seamless auto-scroll */}
          <Flex
            paddingX="16"
            paddingY="12"
            radius="m"
            background="surface"
            border="neutral-medium"
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

          {clientLogos.map((logo, index) => (
            <ClientLogo
              key={`duplicate-${logo.name}-${index}`}
              name={logo.name}
              logoPath={logo.logoPath}
              alt={logo.alt}
            />
          ))}
        </div>
      </div>
    </Column>
  );
}; 