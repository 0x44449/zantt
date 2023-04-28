import { getProjects } from "@/api/projects";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";

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
      <h1>Projects</h1>
      <button className="btn btn-primary" onClick={handleAddProjectClick}>Add Project</button>
      {projects?.map((project) => (
        <div key={project.projectId}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  )
}