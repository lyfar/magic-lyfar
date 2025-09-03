import { Flex, IconButton, SmartLink, Text } from "@/once-ui/components";
import { person, social } from "@/app/resources/content";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      fillWidth
      padding="8"
      horizontal="start"
      mobileDirection="column"
    >
      <Flex
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="start"
        vertical="center"
      >
        <Flex fillWidth mobileDirection="column" gap="16" horizontal="start" vertical="center">
          <Text
            variant="body-default-s"
            onBackground="neutral-medium"
            wrap="balance"
            style={{ textAlign: "left", maxWidth: "32rem" }}
          >
            We bring ideas to life through film, sharp design, and smart code. From cinematic storytelling to pixel-perfect apps and seamless AI workflows, our projects turn attention into action.
          </Text>
          <Text variant="body-default-xs" onBackground="neutral-weak" style={{ textAlign: "left", whiteSpace: "nowrap" }}>
            All Rights Reserved. ©{currentYear} Lyfar Studio | Located in Hong Kong | Business registration Certificate 41163988-000-07-21-A
          </Text>
        </Flex>
        <Flex gap="16">
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
      <Flex height="80" show="s"></Flex>
    </Flex>
  );
};
