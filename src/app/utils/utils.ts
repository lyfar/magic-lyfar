import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  content: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    tags?: string[];
    images: string[];
    video?: string;
    team?: {
      name: string;
      role: string;
      avatar: string;
      linkedIn: string;
    }[];
    link?: string;
  };
}

export function getPosts(pathSegments: string[]): Post[] {
  const postsDirectory = path.join(process.cwd(), ...pathSegments);
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        content,
        metadata: {
          title: data.title || "",
          publishedAt: data.publishedAt || "",
          summary: data.summary || "",
          tags: data.tags || [],
          images: data.images || [],
          video: data.video,
          team: data.team || [],
          link: data.link || "",
        },
      };
    });
}
