import { getProjects } from "@/api/project";
import ProjectItem from "@/apps/moo/components/project/project-item";
import { setProjects } from "@/apps/moo/features/project-slice";
import { useAppDispatch, useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import PropTypes from "prop-types";
import { FC, ReactElement, useEffect } from "react";

type ProjectNavBarProps = {
  onSelectProject?: (projectId: string) => void;
}

const ProjectNavBar: FC<ProjectNavBarProps> = (props): ReactElement => {
  const projects = useAppSelector((state) => state.project.projects);
  const dispatch = useAppDispatch();

  const { data } = useQuery(["/project/projects"], async () => {
    const response = await getProjects();
    return response.data;
  }, {
    suspense: true,
  });

  useEffect(() => {
    if (typeof data !== "undefined") {
      dispatch(setProjects(data));
    }
  }, [data]);

  return (
    <div className="flex flex-col space-y-4">
      {projects.map(project => (
        <Link key={project.projectId} href={`/moo/${project.projectId}`}>
          <a>
            <ProjectItem
              projectId={project.projectId}
              name={project.name}
            />
          </a>
        </Link>
      ))}
    </div>
  )
}

export default ProjectNavBar;