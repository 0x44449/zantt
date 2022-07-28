import { getProjects } from "@/api/project";
import ProjectItem from "@/apps/moo/components/project/project-item";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import PropTypes from "prop-types";
import { Dispatch, FC, ReactElement, SetStateAction, useEffect } from "react";

type ProjectNavBarProps = {
  projectId: string;
  setProjects: Dispatch<SetStateAction<Zantt.ProjectModelType[]>>;
  projects: Zantt.ProjectModelType[];
  onSelectProject?: (projectId: string) => void;
}

const ProjectNavBar: FC<ProjectNavBarProps> = (props): ReactElement => {
  const { data } = useQuery(["project/projects"], async () => {
    const response = await getProjects();
    return response.data;
  }, {
    suspense: true,
  });

  useEffect(() => {
    if (typeof data !== "undefined") {
      props.setProjects(data);
    }
  }, [data]);

  return (
    <>
      {props.projects.map(project => (
        <div key={project.projectId}>
          <Link href={`/moo/${project.projectId}`}>
            <a>
              <ProjectItem
                projectId={project.projectId}
                name={project.name}
              />
            </a>
          </Link>
        </div>
      ))}
    </>
  )
}

ProjectNavBar.propTypes = {
  projectId: PropTypes.string.isRequired,
  setProjects: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired,
  onSelectProject: PropTypes.func,
};

export default ProjectNavBar;