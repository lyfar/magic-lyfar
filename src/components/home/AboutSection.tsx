import React from "react";
import { Heading, Text, Column } from "@/once-ui/components";
import { RevealFx } from "@/once-ui/components";

const AboutSection = () => {
  return (
    <RevealFx translateY="16" delay={1.4}>
      <Column fillWidth paddingY="24" gap="m">
        <Column maxWidth="s">
          <RevealFx translateY="4" fillWidth horizontal="start" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              About
            </Heading>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="start" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              Lyfar Studio is a creative technology studio specializing in product design, AI solutions, and content production. Founded by a technologist with 15+ years of experience, it's a solo-run operation with trusted collaborators brought in on demand.
            </Text>
          </RevealFx>
        </Column>
      </Column>
    </RevealFx>
  );
};

export default AboutSection;
