import { getProjects } from "@/api/project";
import ProjectItem from "@/apps/moo/components/project/project-item";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import PropTypes from "prop-types";
import { useEffect } from "react";

/**
 * @typedef {object} ProjectNavBarPropType
 * @property {string} projectId
 * @property {React.Dispatch<React.SetStateAction<Zantt.ProjectModelType[]>>} setProjects
 * @property {Zantt.ProjectModelType[]} projects
 * @property {(projectId: string) => void} [onSelectProject]
 */
export const ProjectNavBarProp = {
  projectId: PropTypes.string.isRequired,
  setProjects: PropTypes.func.isRequired,
  projects: PropTypes.array,
  onSelectProject: PropTypes.func,
}

/**
 * @param {ProjectNavBarPropType} props 
 * @returns {React.ReactElement}
 */
function ProjectNavBar(props) {
  const { data, isFetched } = useQuery(["project/projects"], async () => {
    const response = await getProjects();
    return response.data;
  }, {
    suspense: true,
    enabled: !props.projects,
  });

  useEffect(() => {
    if (isFetched) {
      props.setProjects(data);
    }
  }, [data]);

  const projects = props.projects ? props.projects : data;

  return (
    <>
      {projects.map(project => (
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

ProjectNavBar.propTypes = ProjectNavBarProp;

export default ProjectNavBar;