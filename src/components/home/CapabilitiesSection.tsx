"use client";

import React from "react";
import { Heading, Text, Column, Flex, Tag } from "@/once-ui/components";
import { RevealFx } from "@/once-ui/components";
import { useRouter } from "next/navigation";

const CapabilitiesSection = () => {
  const router = useRouter();

  // Project counts by category
  const projectCounts = {
    "Automation&AI": 2,
    "Product&Design": 2,
    "Video&Content": 16
  };

  const capabilities = [
    {
      title: "Automation & AI",
      filterTag: "Automation&AI",
      count: projectCounts["Automation&AI"]
    },
    {
      title: "Product & Design",
      filterTag: "Product&Design",
      count: projectCounts["Product&Design"]
    },
    {
      title: "Video & Content",
      filterTag: "Video&Content",
      count: projectCounts["Video&Content"]
    }
  ];

  const handleCapabilityClick = (filterTag: string) => {
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
          <Column fillWidth gap="16">
            <Flex fillWidth horizontal="center">
              <Text variant="heading-strong-l" onBackground="neutral-strong">
                See Case Studies
              </Text>
            </Flex>
            <Flex gap="8" wrap vertical="center" horizontal="center">
              <Text variant="label-default-s" onBackground="neutral-weak">Filter:</Text>
              {capabilities.map((capability) => (
                <Tag
                  key={capability.filterTag}
                  variant="neutral"
                  size="l"
                  label={`${capability.title} (${capability.count})`}
                  onClick={() => handleCapabilityClick(capability.filterTag)}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </Flex>
          </Column>
        </Column>
      </Column>
    </RevealFx>
  );
};

export default CapabilitiesSection;