import { getProjects } from "@/api/projects";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import ProjectCard from "./ProjectCard";
import NavBar from "@/components/NavBar";

export default function Projects() {
  const router = useRouter();

  const { data: projects } = useQuery(["projects"], async () => {
    const result = await getProjects();
    return result;
  });

  const handleAddProjectClick = () => {
    router.push("/project-add");
  }

  return (
    <div>
      <NavBar />
      <div className="px-8">
        <div className="py-4">
          <button className="btn btn-primary" onClick={handleAddProjectClick}>Add Project</button>
        </div>
        <div className="flex flex-col gap-y-4">
          {projects?.map((project) => (
            <div key={project.projectId}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}