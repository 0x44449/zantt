import ProjectNavButton from "@/apps/moo/components/project/project-nav-button";
import { useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import Link from "next/link";
import { FC, ReactElement, useEffect } from "react";

type ProjectNavBarProps = {
  onSelectProject?: (projectId: string) => void;
}

const ProjectNavBar: FC<ProjectNavBarProps> = (props): ReactElement => {
  const projects = useAppSelector((state) => state.project.projects);
  const projectId = useAppSelector((state) => state.project.projectId);

  return (
    <div className="flex flex-col">
      {projects.map(project => (
        <Link key={project.projectId} href={`/moo/${project.projectId}`}>
          <a className={`w-full hover:bg-gray-700${project.projectId === projectId ? " bg-gray-900" : ""}`}>
            <ProjectNavButton
              name={project.name}
              className="p-2 py-3"
            />
          </a>
        </Link>
      ))}
    </div>
  )
}

export default ProjectNavBar;