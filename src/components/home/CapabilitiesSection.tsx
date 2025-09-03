"use client";

import React from "react";
import { Heading, Text, Column, Row, Card, Flex } from "@/once-ui/components";
import { RevealFx } from "@/once-ui/components";
import {
  Bot,
  Monitor,
  Video,
  ArrowRight,
  Code
} from "lucide-react";
import { useRouter } from "next/navigation";

const CapabilitiesSection = () => {
  const router = useRouter();

  // Project counts by category
  const projectCounts = {
    "Automation & AI": 2, // Dead Poets AI, Gweilo App
    "Product & Design": 2, // HSBC Digital, Sauce Barbershop
    "Video & Content": 16 // All video projects
  };

  const capabilities = [
    {
      title: "Automation & AI",
      description: "From CRM integrations and chatbots to workflow pipelines, we design automation that saves time and scales your business.",
      icon: <Bot className="w-6 h-6" />,
      features: ["CRM Integration", "Chatbots", "Workflow Pipelines"],
      projectCount: projectCounts["Automation & AI"],
      filterTags: ["ai"]
    },
    {
      title: "Product & Design",
      description: "Websites, mobile apps, and rapid prototypes. We combine UX design with technical execution to take ideas from sketch to production.",
      icon: <Code className="w-6 h-6" />,
      features: ["Websites", "Mobile Apps", "Rapid Prototypes"],
      projectCount: projectCounts["Product & Design"],
      filterTags: ["dev"]
    },
    {
      title: "Video & Content",
      description: "Brand films, interviews, and social campaigns. With a background in high-end video production, we craft stories that resonate and drive attention.",
      icon: <Video className="w-6 h-6" />,
      features: ["Brand Films", "Interviews", "Social Campaigns"],
      projectCount: projectCounts["Video & Content"],
      filterTags: ["video"]
    }
  ];

  const handleCapabilityClick = (filterTags: string[]) => {
    const tagString = filterTags.join(',');
    router.push(`/work#${tagString}`);
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
                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                onClick={() => handleCapabilityClick(capability.filterTags)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <Column gap="16">
                  <Flex gap="12" vertical="center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-alpha-weak">
                      <div className="text-neutral-strong">
                        {capability.icon}
                      </div>
                    </div>
                    <Flex fillWidth horizontal="space-between" vertical="center">
                      <Heading
                        as="h3"
                        variant="heading-strong-l"
                        onBackground="neutral-strong"
                      >
                        {capability.title}
                      </Heading>
                      <Text variant="label-default-s" onBackground="neutral-weak">
                        {capability.projectCount} projects
                      </Text>
                    </Flex>
                  </Flex>
                  <Text
                    variant="body-default-m"
                    onBackground="neutral-weak"
                  >
                    {capability.description}
                  </Text>
                  <Column gap="12">
                    {capability.features.map((feature, featureIndex) => (
                      <Text key={featureIndex} variant="body-default-m" onBackground="neutral-weak">
                        • {feature}
                      </Text>
                    ))}
                  </Column>
                  <Flex fillWidth horizontal="end" paddingTop="16">
                    <Flex gap="8" vertical="center" style={{ color: 'var(--brand-primary)' }}>
                      <Text variant="label-default-s" style={{ color: 'var(--brand-primary)' }}>
                        View Case Studies
                      </Text>
                      <ArrowRight className="w-4 h-4" />
                    </Flex>
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