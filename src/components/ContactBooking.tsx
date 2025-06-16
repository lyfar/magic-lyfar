"use client";

import { Button, Flex, Heading, Text, Background, Column, Icon } from "@/once-ui/components";
import { mailchimp } from "@/app/resources";
import { opacity, SpacingToken } from "@/once-ui/types";

type ContactBookingProps = {
  display: boolean;
  title: string | JSX.Element;
  description: string | JSX.Element;
  bookingUrl: string;
  email: string;
  phone?: string;
};

export const ContactBooking = ({ contact }: { contact: ContactBookingProps }) => {
  return (
    <Column
      overflow="hidden"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      horizontal="center"
      align="center"
      background="surface"
      border="neutral-alpha-weak"
      position="relative"
    >
      <Background
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        mask={{
          x: mailchimp.effects.mask.x,
          y: mailchimp.effects.mask.y,
          radius: mailchimp.effects.mask.radius,
          cursor: mailchimp.effects.mask.cursor
        }}
        gradient={{
          display: mailchimp.effects.gradient.display,
          opacity: mailchimp.effects.gradient.opacity as opacity,
          x: mailchimp.effects.gradient.x,
          y: mailchimp.effects.gradient.y,
          width: mailchimp.effects.gradient.width,
          height: mailchimp.effects.gradient.height,
          tilt: mailchimp.effects.gradient.tilt,
          colorStart: mailchimp.effects.gradient.colorStart,
          colorEnd: mailchimp.effects.gradient.colorEnd,
        }}
        dots={{
          display: mailchimp.effects.dots.display,
          opacity: mailchimp.effects.dots.opacity as opacity,
          size: mailchimp.effects.dots.size as SpacingToken,
          color: mailchimp.effects.dots.color,
        }}
        grid={{
          display: mailchimp.effects.grid.display,
          opacity: mailchimp.effects.grid.opacity as opacity,
          color: mailchimp.effects.grid.color,
          width: mailchimp.effects.grid.width,
          height: mailchimp.effects.grid.height,
        }}
        lines={{
          display: mailchimp.effects.lines.display,
          opacity: mailchimp.effects.lines.opacity as opacity,
          size: mailchimp.effects.lines.size as SpacingToken,
          thickness: mailchimp.effects.lines.thickness,
          angle: mailchimp.effects.lines.angle,
          color: mailchimp.effects.lines.color,
        }}
      />
      
      <Heading style={{ position: "relative", zIndex: 1 }} marginBottom="s" variant="display-strong-xs">
        {contact.title}
      </Heading>
      
      <Text
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "var(--responsive-width-xs)",
        }}
        wrap="balance"
        marginBottom="l"
        onBackground="neutral-medium"
      >
        {contact.description}
      </Text>
      
      <Flex 
        style={{
          position: "relative",
          zIndex: 1,
        }}
        direction="column"
        fillWidth 
        maxWidth={32} 
        gap="12"
        horizontal="center"
        align="center"
      >
        <Button
          href={contact.bookingUrl}
          size="m"
          variant="primary"
          prefixIcon="calendar"
          fillWidth
        >
          Book Appointment
        </Button>
        
        <Flex gap="12" fillWidth horizontal="center">
          <Button
            href={`mailto:${contact.email}`}
            size="m"
            variant="secondary"
            prefixIcon="email"
            style={{ flex: 1 }}
          >
            {contact.email}
          </Button>
          
          {contact.phone && (
            <Button
              href={`tel:+852${contact.phone}`}
              size="m"
              variant="tertiary"
              prefixIcon="phone"
              style={{ flex: 1 }}
            >
              +852 {contact.phone}
            </Button>
          )}
        </Flex>
      </Flex>
    </Column>
  );
}; 