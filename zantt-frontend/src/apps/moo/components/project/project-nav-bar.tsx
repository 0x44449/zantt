import { getProjects } from "@/api/project";
import ProjectVerticalScrollable from "@/apps/moo/components/project/project-vertical-scrollable";
import ProjectStickyAddButton from "@/apps/moo/components/project/project-sticky-add-button";
import ProjectNavButton from "@/apps/moo/components/project/project-nav-button";
import { setProjects } from "@/apps/moo/features/project-slice";
import { useAppDispatch, useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import { useQuery } from "@tanstack/react-query";
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
              projectId={project.projectId}
              name={project.name}
              className="p-2"
            />
          </a>
        </Link>
      ))}
    </div>
  )
}

export default ProjectNavBar;