"use client";

import React from "react";
import { Heading, Text, Column, Row, Card, Flex, Icon } from "@/once-ui/components";
import { RevealFx } from "@/once-ui/components";
import { useRouter } from "next/navigation";

const CapabilitiesSection = () => {
  const router = useRouter();

  // Project counts by category (removed from display)

  const capabilities = [
    {
      title: "Automation & AI",
      description: "From CRM integrations and chatbots to workflow pipelines, we design automation that saves time and scales your business.",
      icon: "cpu",
      features: ["CRM Integration", "Chatbots", "Workflow Pipelines"]
    },
    {
      title: "Product & Design",
      description: "Websites, mobile apps, and rapid prototypes. We combine UX design with technical execution to take ideas from sketch to production.",
      icon: "computer",
      features: ["Websites", "Mobile Apps", "Rapid Prototypes"]
    },
    {
      title: "Video & Content",
      description: "Brand films, interviews, and social campaigns. We craft stories that resonate and drive attention with high-end video production.",
      icon: "video",
      features: ["Brand Films", "Interviews", "Social Campaigns"]
    }
  ];

  const handleCapabilityClick = (capabilityTitle: string) => {
    let filterTag = '';
    if (capabilityTitle === "Automation & AI") {
      filterTag = "Automation&AI";
    } else if (capabilityTitle === "Product & Design") {
      filterTag = "Product&Design";
    } else if (capabilityTitle === "Video & Content") {
      filterTag = "Video&Content";
    }
    router.push(`/work#${filterTag}`);
  };

  return (
    <RevealFx translateY="16" delay={1.0}>
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              What we deliver
            </Heading>
          </RevealFx>
        </Column>

        <Column maxWidth="m">
          <Row gap="m" mobileDirection="column">
            {capabilities.map((capability, index) => (
              <Card
                key={index}
                fillWidth
                direction="column"
                radius="l"
                padding="32"
                background="surface"
                border="neutral-medium"
                shadow="l"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '240px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
                onClick={() => handleCapabilityClick(capability.title)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <Column gap="16" fillWidth style={{ flexGrow: 1 }}>
                  <Flex gap="12" vertical="center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-alpha-weak">
                      <Icon name={capability.icon} size="xl" onBackground="neutral-strong" />
                    </div>
                    <Heading
                      as="h3"
                      variant="heading-strong-l"
                      onBackground="neutral-strong"
                    >
                      {capability.title}
                    </Heading>
                  </Flex>
                  <Text
                    variant="body-default-m"
                    onBackground="neutral-weak"
                  >
                    {capability.description}
                  </Text>
                  <Column gap="12" style={{ marginTop: 'auto' }}>
                    {capability.features.map((feature, featureIndex) => (
                      <Text key={featureIndex} variant="body-default-m" onBackground="neutral-weak">
                        • {feature}
                      </Text>
                    ))}
                  </Column>
                  <Flex fillWidth horizontal="end" paddingTop="16" style={{ position: 'absolute', top: '16px', right: '16px' }}>
                    <Icon name="arrowRight" size="l" onBackground="brand-strong" />
                  </Flex>
                </Column>
              </Card>
            ))}
          </Row>
        </Column>
      </Column>
    </RevealFx>
  );
};

export default CapabilitiesSection;