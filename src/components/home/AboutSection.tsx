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
              The only Hong Kong–based Creative Technology studio that unifies creative direction, software engineering, and AI automation to turn ideas live fast.
            </Text>
          </RevealFx>
        </Column>
      </Column>
    </RevealFx>
  );
};

export default AboutSection;
