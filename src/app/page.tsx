import React from "react";

import { Heading, Flex, Text, Button, Avatar, RevealFx, Column, Badge, Row } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { FeaturedWorks } from "@/components/work/FeaturedWorks";
import { Logo } from "@/components/Logo";
import { CapabilitiesSection, AboutSection } from "@/components/home";
import { AnimatedBackground } from "@/components/ui/animated-background";

import { baseURL, routes } from "@/app/resources";
import { home, about, person, contact } from "@/app/resources/content";
import { ContactBooking, LogosSection, TestimonialsSection } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { Meta, Schema } from "@/once-ui/modules";
import { getPosts } from "@/app/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
  });
}

export default function Home() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}/og?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      {/* Hero Section (full viewport, full-bleed, no page shift) */}
      <div style={{
        position: 'relative',
        width: '100vw',
        height: '100vh', // Full viewport height
        overflow: 'hidden',
        marginTop: '-120px', // include header within hero background
        paddingTop: '120px'
      }}>

        {/* Background layer scoped to hero only (full-bleed) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none'
        }}>
          <AnimatedBackground />
          {/* Blur overlay for better text readability */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter: 'blur(2px) brightness(0.95) contrast(1.1)',
            WebkitBackdropFilter: 'blur(2px) brightness(0.95) contrast(1.1)', // Safari support
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.1) 100%)',
            zIndex: 1,
            pointerEvents: 'none'
          }} />
        </div>

        {/* Hero Content - vertically centered */}
        <Column fillWidth paddingY="24" gap="m" horizontal="center" style={{ height: '100%', justifyContent: 'center' }}>
          {/* Mobile Logo */}
          <RevealFx show="s" fillWidth horizontal="center" paddingBottom="24">
            <Logo width={80} height={40} />
          </RevealFx>
          
          <Column maxWidth="s" horizontal="center">
            {home.featured && (
            <RevealFx fillWidth horizontal="center" paddingTop="16" paddingBottom="32">
              <Badge background="brand-alpha-weak" paddingX="12" paddingY="4" onBackground="neutral-strong" textVariant="label-default-s" arrow={false}
                href={home.featured.href}>
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
            )}
            <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="24">
              <Heading wrap="balance" variant="display-strong-l">
                {home.headline}
              </Heading>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
              <Text wrap="balance" onBackground="neutral-strong" variant="heading-default-xl" align="center">
                {home.subline}
              </Text>
            </RevealFx>
            <RevealFx paddingTop="12" delay={0.4} horizontal="center">
              <Flex gap="m" mobileDirection="column" horizontal="center" vertical="center">
                <Button
                  data-border="rounded"
                  href="https://meet.egor.lol/lyfar/15min?layout=mobile"
                  variant="primary"
                  size="m"
                  arrowIcon
                >
                  Book a discovery call
                </Button>
                <Button
                  data-border="rounded"
                  href="/work"
                  variant="secondary"
                  size="m"
                  arrowIcon
                >
                  See recent work
                </Button>
              </Flex>
            </RevealFx>
                    </Column>
        </Column>
      </div>

      {/* Main content (centered container) */}
      <Column maxWidth="m" gap="xl" horizontal="center">
      
      <RevealFx translateY="16" delay={0.6}>
        <LogosSection />
      </RevealFx>
      <AboutSection />
      <CapabilitiesSection />
      <RevealFx translateY="16" delay={1.6}>
        <Projects initialProjects={allProjects} range={[1, 1]} />
      </RevealFx>
      <RevealFx translateY="16" delay={1.8}>
        <TestimonialsSection />
      </RevealFx>
      <RevealFx translateY="16" delay={2.0}>
        <FeaturedWorks initialProjects={allProjects} />
      </RevealFx>
      {routes["/blog"] && (
        <RevealFx translateY="16" delay={2.2}>
          <Flex fillWidth gap="24" mobileDirection="column">
            <Flex flex={1} paddingLeft="l" paddingTop="24">
              <Heading as="h2" variant="display-strong-xs" wrap="balance">
                Latest from the blog
              </Heading>
            </Flex>
            <Flex flex={3} paddingX="20">
              <Posts range={[1, 2]} columns="2" />
            </Flex>
          </Flex>
        </RevealFx>
      )}
        {contact.display && <ContactBooking contact={contact} />}
      </Column>
    </Column>
  );
}
