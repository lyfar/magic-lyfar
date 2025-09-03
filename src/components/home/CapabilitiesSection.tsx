"use client";

import React from "react";
import { Heading, Text, Column, Row } from "@/once-ui/components";
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
              <div
                key={index}
                className="flex-1 p-6 md:p-8 rounded-xl bg-background border border-neutral-weak/50 hover:border-neutral-weak hover:shadow-lg transition-all duration-300 group"
              >
                <Column gap="l">
                  {/* Simple icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-neutral-alpha-weak group-hover:bg-neutral-alpha-medium transition-colors duration-300">
                    <div className="text-neutral-strong">
                      {capability.icon}
                    </div>
                  </div>

                  <div>
                    <Heading as="h3" variant="heading-strong-l" wrap="balance" className="mb-4">
                      {capability.title}
                    </Heading>
                    <Text wrap="balance" onBackground="neutral-weak" variant="body-default-l" className="mb-6 leading-relaxed">
                      {capability.description}
                    </Text>
                  </div>

                  <Column gap="s">
                    {capability.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <span className="text-neutral-weak mt-0.5 mr-3 text-xs font-normal leading-normal select-none w-3 flex-shrink-0">•</span>
                        <Text variant="body-default-m" onBackground="neutral-weak" className="leading-relaxed">
                          {feature}
                        </Text>
                      </div>
                    ))}
                  </Column>
                </Column>
              </div>
            ))}
          </Row>
        </Column>
      </Column>
    </RevealFx>
  );
};

export default CapabilitiesSection;