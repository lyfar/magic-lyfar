"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Tag,
  OptimizedVideoPlayer,
} from "@/once-ui/components";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  video?: string;
  poster?: string;
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  tags?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  video,
  poster,
  title,
  content,
  description,
  avatars,
  link,
  tags = [],
}) => {
  return (
    <Column fillWidth gap="m">
      {video ? (
        <OptimizedVideoPlayer 
          src={video} 
          lazy={true}
          quality="auto"
        />
      ) : (
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          images={images.map((image) => ({
            src: image,
            alt: title,
          }))}
        />
      )}
      <Flex
        mobileDirection="column"
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5}>
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim() || tags.length > 0) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {tags.length > 0 && (
              <Flex gap="8" wrap>
                {tags.map((tag, index) => (
                  <Tag key={index} variant="neutral" size="s" label={tag} />
                ))}
              </Flex>
            )}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">Read case study</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">View project</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
