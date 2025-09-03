import { Flex, IconButton, SmartLink, Text, Column } from "@/once-ui/components";
import { person, social } from "@/app/resources/content";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      fillWidth
      paddingY="l"
      paddingX="l"
    >
      <Flex horizontal="center" fillWidth>
        <Column maxWidth="m" horizontal="center" fillWidth>
          <Flex
            fillWidth
            paddingY="l"
            gap="32"
            horizontal="space-between"
            vertical="center"
            mobileDirection="column"
          >
            <Column fillWidth gap="24" maxWidth="xl">
                          <Text
              variant="body-default-s"
              onBackground="neutral-weak"
              wrap="balance"
              style={{ textAlign: "left" }}
            >
              Based in Hong Kong, we bring ideas to life through film, sharp design, and smart code. From cinematic storytelling to pixel-perfect apps and seamless AI workflows, our projects turn attention into action across Asia.
            </Text>
            <Text
              variant="body-default-xs"
              onBackground="neutral-weak"
              style={{ textAlign: "left", whiteSpace: "normal" }}
            >
              All Rights Reserved. ©{currentYear} Lyfar Studio | Located in Hong Kong | Business registration Certificate 41163988-000-07-21-A
            </Text>
            </Column>
            <Flex gap="16" horizontal="end">
              {social.map(
                (item) =>
                  item.link && (
                    <IconButton
                      key={item.name}
                      href={item.link}
                      icon={item.icon}
                      tooltip={item.name}
                      size="s"
                      variant="ghost"
                    />
                  ),
              )}
            </Flex>
          </Flex>
        </Column>
      </Flex>
    </Flex>
  );
};
