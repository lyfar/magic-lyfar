import { getPosts } from "@/app/utils/utils";
import { Column, Text, Button, Flex, Badge, RevealFx } from "@/once-ui/components";
import { ProjectCard } from "@/components";

export function FeaturedWorks() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);

  // Sort by publish date
  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  // Get the latest project (already displayed above)
  const latestProject = sortedProjects[0];

  // Get one project per category, excluding the latest project
  const categories = ["video", "dev", "ai"];
  let availableProjects = sortedProjects.filter(project => project.slug !== latestProject?.slug);
  
  const featuredProjects: typeof sortedProjects = [];
  
  // Select one project per category, ensuring no duplicates
  for (const category of categories) {
    const project = availableProjects.find(project => 
      project.metadata.tags?.includes(category)
    );
    
    if (project) {
      featuredProjects.push(project);
      // Remove this project from available projects to prevent duplicates
      availableProjects = availableProjects.filter(p => p.slug !== project.slug);
    }
  }

      return (
      <Column fillWidth gap="xl" marginBottom="40">
        <Column fillWidth>
          <RevealFx fillWidth horizontal="start" paddingBottom="16">
            <Flex fillWidth horizontal="start">
              <Badge 
                background="brand-alpha-weak" 
                paddingX="12" 
                paddingY="4" 
                onBackground="brand-strong" 
                textVariant="label-default-s"
              >
                Recent Works
              </Badge>
            </Flex>
          </RevealFx>
          <RevealFx translateY="4" fillWidth paddingBottom="16">
            <Flex fillWidth horizontal="space-between" vertical="center">
              <Text 
                variant="display-strong-l" 
                onBackground="neutral-strong"
              >
                Latest projects
              </Text>
              <Button 
                href="/work" 
                variant="secondary" 
                size="m"
                arrowIcon
              >
                See All Works
              </Button>
            </Flex>
          </RevealFx>
          <RevealFx translateY="8" delay={0.2} fillWidth paddingBottom="32">
            <Text 
              variant="body-default-l" 
              onBackground="neutral-weak"
            >
              Explore our work across video, development, and AI projects
            </Text>
          </RevealFx>
        </Column>
      
      <Column fillWidth gap="xl" paddingX="l">
        {featuredProjects.map((post, index) => (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`work/${post.slug}`}
            images={post.metadata.images}
            video={post.metadata.video}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
            link={post.metadata.link || ""}
            tags={post.metadata.tags || []}
          />
        ))}
      </Column>
    </Column>
  );
} 