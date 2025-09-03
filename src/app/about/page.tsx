import {
  Avatar,
  Button,
  Column,
  Flex,
  Grid,
  Heading,
  HoloFx,
  Icon,
  IconButton,
  RevealFx,
  SmartImage,
  Tag,
  Text,
  Line,
  AccordionGroup,
  Card,
  OgCard,
} from "@/once-ui/components";
import { Logo } from "@/components/Logo";
import { baseURL } from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { person, about, social } from "@/app/resources/content";
import React from "react";
import { Meta, Schema } from "@/once-ui/modules";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: [],
    },
    {
      title: about.services.title,
      display: about.services.display,
      items: [],
    },
    {
      title: about.mission.title,
      display: about.mission.display,
      items: [],
    },
    {
      title: about.manifesto.title,
      display: about.manifesto.display,
      items: [],
    },
    {
      title: about.principles.title,
      display: about.principles.display,
      items: [],
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`${baseURL}/og?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {/* Mobile Logo */}
        <RevealFx show="s" fillWidth horizontal="center" paddingBottom="24">
          <Logo width={80} height={40} />
        </RevealFx>
        
        {about.avatar.display && about.team.display && (
          <Column
            className={styles.avatar}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="l"
            flex={3}
            horizontal="center"
          >
            {about.team.members.map((member, index) => (
              <Column key={index} gap="m" horizontal="center" align="center">
                <Avatar
                  src={member.image}
                  size="l"
                />
                <Column gap="4" align="center" maxWidth={320}>
                  <Text variant="heading-strong-s" align="center">
                    {member.name}
                  </Text>
                  <Text variant="label-default-s" onBackground="neutral-weak" align="center">
                    {member.role}
                  </Text>
                  <Text variant="body-default-xs" onBackground="neutral-medium" align="center" style={{ textAlign: "center", lineHeight: "1.4" }}>
                    {member.description}
                  </Text>
                </Column>
              </Column>
            ))}
          </Column>
        )}
        <Column flex={9} maxWidth={40}>
          <RevealFx>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <a
                href={about.calendar.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
                className={styles.scheduleButton}
              >
                <div
                  className={styles.scheduleButtonInner}
                >
                  <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                  <Flex paddingX="8">Schedule a call</Flex>
                  <IconButton
                    data-border="rounded"
                    variant="secondary"
                    icon="chevronRight"
                    style={{ pointerEvents: 'none' }}
                  />
                </div>
              </a>
            )}
              <Heading variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
                <Flex paddingTop="20" paddingBottom="8" gap="8" wrap horizontal="center" fitWidth data-border="rounded">
                {social.map(
                  (item) =>
                    item.link && (
                        <React.Fragment key={item.name}>
                            <Button
                                className="s-flex-hide"
                                key={item.name}
                                href={item.link}
                                prefixIcon={item.icon}
                                label={item.name}
                                size="s"
                                variant="secondary"
                            />
                            <IconButton
                                className="s-flex-show"
                                size="l"
                                key={`${item.name}-icon`}
                                href={item.link}
                                icon={item.icon}
                                variant="secondary"
                            />
                        </React.Fragment>
                    ),
                )}
              </Flex>
            )}
          </Column>
          </RevealFx>

          {about.intro.display && (
            <RevealFx delay={0.2}>
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
            </RevealFx>
          )}

          <Line marginBottom="xl" />

          {/* Services Section */}
          {about.services.display && (
            <RevealFx delay={0.4}>
              <Column fillWidth gap="m" marginBottom="xl">
                <Heading as="h2" id={about.services.title} variant="display-strong-s">
                  {about.services.title}
                </Heading>
                <Grid columns="1" mobileColumns="1" gap="24">
                  {about.services.items.map((service, index) => (
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
                          <Icon onBackground="neutral-weak" name={service.icon} />
                          <Heading
                            as="h3"
                            variant="heading-strong-l"
                            onBackground="neutral-strong"
                          >
                            {service.title}
                          </Heading>
                        </Flex>
                        <Text
                          variant="body-default-m"
                          onBackground="neutral-weak"
                        >
                          {service.description}
                        </Text>
                      </Column>
                    </Card>
                  ))}
                </Grid>
              </Column>
            </RevealFx>
          )}

          {/* Work Section */}
          {about.work.display && (
            <RevealFx delay={0.4}>
              <Column>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
                {about.work.subline && (
                  <Text variant="body-default-l" onBackground="brand-weak" marginBottom="m">
                    {about.work.subline}
                      </Text>
                )}
                <Column gap="24" marginBottom="40">
                  {about.work.description.map((paragraph, index) => (
                    <Text key={index} variant="body-default-m">
                      {paragraph}
                    </Text>
                  ))}
                </Column>
              </Column>
            </RevealFx>
          )}

          <Line marginBottom="xl" />

          {/* Mission Section */}
          {about.mission.display && (
            <RevealFx delay={0.6}>
              <Column fillWidth gap="m" marginBottom="xl">
                <Heading as="h2" id={about.mission.title} variant="display-strong-s">
                  {about.mission.title}
                </Heading>
                <Grid columns="1" mobileColumns="1" gap="24">
                  {about.mission.parts.map((part, index) => (
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
                          <Icon onBackground="neutral-weak" name={part.icon} />
                          <Heading
                            as="h3"
                            variant="heading-strong-l"
                            onBackground="neutral-strong"
                          >
                            {part.title}
                          </Heading>
                        </Flex>
                        <Text
                          variant="body-default-m"
                          onBackground="neutral-weak"
                        >
                          {part.description}
                        </Text>
                      </Column>
                    </Card>
                  ))}
                </Grid>
              </Column>
            </RevealFx>
          )}

          <Line marginBottom="xl" />

          {/* Manifesto Section */}
          {about.manifesto.display && (
            <RevealFx delay={0.8}>
              <Column fillWidth gap="m" marginBottom="xl">
                <Heading as="h2" id={about.manifesto.title} variant="display-strong-s">
                  {about.manifesto.title}
                </Heading>
                <Column gap="24" marginBottom="32">
                  {about.manifesto.description.map((desc, index) => (
                    <Text
                      key={index}
                      variant="body-default-l"
                      onBackground="neutral-medium"
                    >
                      {desc}
                    </Text>
                  ))}
                </Column>
                <Grid columns="2" mobileColumns="1" gap="24">
                  {about.manifesto.values.map((value, index) => (
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
                      <Column gap="12">
                        <Flex gap="12" vertical="center">
                          <Icon onBackground="neutral-weak" name={value.icon} />
                          <Heading
                            as="h3"
                            variant="heading-strong-l"
                            onBackground="neutral-strong"
                          >
                            {value.title}
                          </Heading>
                        </Flex>
                        <Text
                          variant="body-default-m"
                          onBackground="neutral-weak"
                        >
                          {value.subline}
                        </Text>
                      </Column>
                    </Card>
                  ))}
                </Grid>
                <Text
                  variant="label-default-s"
                  align="center"
                  onBackground="neutral-weak"
                  marginTop="m"
                  style={{ textTransform: "uppercase" }}
                >
                  {about.manifesto.conclusion}
                </Text>
              </Column>
            </RevealFx>
          )}

          <Line marginBottom="xl" />

          {/* Principles Section */}
          {about.principles.display && (
            <RevealFx delay={1.0}>
              <Column fillWidth gap="m" marginBottom="xl">
                <Heading
                  as="h2"
                  id={about.principles.title}
                  variant="display-strong-s"
                  marginBottom="m"
                >
                  {about.principles.title}
                </Heading>
                <AccordionGroup
                  items={about.principles.points.map((principle: string, index: number) => ({
                    title: `Principle #${index + 1}`,
                    content: <Text>{principle}</Text>,
                  }))}
                />
              </Column>
            </RevealFx>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill}-${index}`} fillWidth gap="4">
                    <Text variant="heading-strong-l">{skill.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {skill.images && skill.images.length > 0 && (
                      <Flex fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image, index) => (
                          <Flex
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            //@ts-ignore
                            minWidth={image.width}
                            //@ts-ignore
                            height={image.height}
                          >
                            <SmartImage
                              enlarge
                              radius="m"
                              //@ts-ignore
                              sizes={image.width.toString()}
                              //@ts-ignore
                              alt={image.alt}
                              //@ts-ignore
                              src={image.src}
                            />
                          </Flex>
                        ))}
                      </Flex>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
