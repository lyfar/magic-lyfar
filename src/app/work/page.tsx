import { WorkPage } from "./WorkPage";
import { baseURL } from "@/app/resources";
import { work } from "@/app/resources/content";
import { Meta } from "@/once-ui/modules";
import { getPosts } from "@/app/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `${baseURL}/og?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);
  
  return <WorkPage initialProjects={allProjects} />;
}
