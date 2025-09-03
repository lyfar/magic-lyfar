import { Column } from "@/once-ui/components";
import { ProjectCard } from "@/components";
import { Post } from "@/app/utils/utils";

interface ProjectsProps {
  range?: [number, number?];
  selectedTags?: string[];
  initialProjects: Post[];
}

export function Projects({ range, selectedTags = [], initialProjects }: ProjectsProps) {
  const sortedProjects = initialProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  let displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  // Filter projects by selected tags
  if (selectedTags.length > 0) {
    displayedProjects = displayedProjects.filter(project => 
      project.metadata.tags?.some(tag => selectedTags.includes(tag))
    );
  }

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l" horizontal="center">
      {displayedProjects.map((post, index) => (
        <Column key={post.slug} fillWidth maxWidth="l" horizontal="center">
          <ProjectCard
            priority={index < 2}
            href={`/work/${post.slug}`}
            images={post.metadata.images}
            video={post.metadata.video}
            videoWebm={post.metadata.videoWebm}
            videoHD={post.metadata.videoHD}
            videoMD={post.metadata.videoMD}
            videoSD={post.metadata.videoSD}
            poster={post.metadata.poster}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
            link={post.metadata.link || ""}
            tags={post.metadata.tags || []}
          />
        </Column>
      ))}
    </Column>
  );
}
