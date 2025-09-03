"use client";

import React from "react";
import { Heading, Text, Column, Row, Card, Flex } from "@/once-ui/components";
import { RevealFx } from "@/once-ui/components";
import {
  Bot,
  Monitor,
  Video
} from "lucide-react";

const CapabilitiesSection = () => {
    const capabilities = [
    {
      title: "Automation & AI",
      description: "From CRM integrations and chatbots to workflow pipelines, we design automation that saves time and scales your business.",
      icon: <Bot className="w-6 h-6" />,
      features: ["CRM Integration", "Chatbots", "Workflow Pipelines"]
    },
    {
      title: "Product & Design",
      description: "Websites, mobile apps, and rapid prototypes. We combine UX design with technical execution to take ideas from sketch to production.",
      icon: <Monitor className="w-6 h-6" />,
      features: ["Websites", "Mobile Apps", "Rapid Prototypes"]
    },
    {
      title: "Video & Content",
      description: "Brand films, interviews, and social campaigns. With a background in high-end video production, we craft stories that resonate and drive attention.",
      icon: <Video className="w-6 h-6" />,
      features: ["Brand Films", "Interviews", "Social Campaigns"]
    }
  ];

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
              >
                <Column gap="16">
                  <Flex gap="12" vertical="center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-alpha-weak">
                      <div className="text-neutral-strong">
                        {capability.icon}
                      </div>
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
                  <Column gap="12">
                    {capability.features.map((feature, featureIndex) => (
                      <Text key={featureIndex} variant="body-default-m" onBackground="neutral-weak">
                        • {feature}
                      </Text>
                    ))}
                  </Column>
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