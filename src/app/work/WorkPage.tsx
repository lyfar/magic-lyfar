"use client";

import React from "react";
import { Column, Flex, Tag, Text, RevealFx, Button } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { about, person, work } from "@/app/resources/content";
import { Schema } from "@/once-ui/modules";
import { Projects } from "@/components/work/Projects";
import { Logo } from "@/components/Logo";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/app/utils/utils";

interface WorkPageProps {
  initialProjects: Post[];
}

export function WorkPage({ initialProjects }: WorkPageProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();
  const availableTags = React.useMemo(() => ["video", "dev", "ai"], []);

  // Initialize tags from URL hash on component mount
  useEffect(() => {
    const parseHashTags = (hash: string): string[] => {
      if (!hash || hash === '#') return [];
      const tagString = hash.replace('#', '');
      return tagString.split(',').filter(tag => availableTags.includes(tag));
    };

    const hash = window.location.hash;
    const initialTags = parseHashTags(hash);
    if (initialTags.length > 0) {
      setSelectedTags(initialTags);
    }
  }, [availableTags]);

  // Update URL hash when tags change
  const updateUrlHash = (tags: string[]) => {
    const hashValue = tags.length > 0 ? `#${tags.join(',')}` : '';
    const newUrl = `${window.location.pathname}${hashValue}`;
    window.history.replaceState(null, '', newUrl);
  };

  // Update URL hash whenever selectedTags changes
  useEffect(() => {
    updateUrlHash(selectedTags);
  }, [selectedTags]);

  // Calculate project counts for each tag
  const tagsWithCounts = availableTags.map(tag => ({
    label: tag,
    count: initialProjects.filter(project => 
      project.metadata.tags?.includes(tag)
    ).length
  }));

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      return prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag];
    });
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
  };

  const filteredProjectsCount = selectedTags.length > 0 
    ? initialProjects.filter(project => 
        project.metadata.tags?.some(tag => selectedTags.includes(tag))
      ).length
    : initialProjects.length;

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`${baseURL}/og?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      {/* Mobile Logo */}
      <RevealFx show="s" fillWidth horizontal="center" paddingY="24">
        <Logo width={80} height={40} />
      </RevealFx>

      {/* Simple Filter Section */}
      <Column fillWidth gap="16" paddingX="l" paddingY="m">
        <Flex fillWidth horizontal="space-between" vertical="center" wrap>
          <Text variant="heading-strong-s" onBackground="neutral-strong">
            Projects ({filteredProjectsCount})
          </Text>
          {selectedTags.length > 0 && (
            <Button
              variant="tertiary"
              size="s"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          )}
        </Flex>
        
        <Flex gap="8" wrap vertical="center">
          <Text variant="label-default-s" onBackground="neutral-weak">Filter:</Text>
          {tagsWithCounts.map((tag) => (
            <Tag
              key={tag.label}
              variant={selectedTags.includes(tag.label) ? "brand" : "neutral"}
              size="s"
              label={`${tag.label} (${tag.count})`}
              onClick={() => handleTagClick(tag.label)}
              style={{ 
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </Flex>
      </Column>

      <Projects initialProjects={initialProjects} selectedTags={selectedTags} />
    </Column>
  );
} 