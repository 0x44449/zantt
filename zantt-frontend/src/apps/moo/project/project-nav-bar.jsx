import ProjectItem from "@/components/moo/project/project-item";
import Link from "next/link";
import PropTypes from "prop-types";

/**
 * @typedef {object} ProjectNavBarPropType
 * @property {string} selectedProjectId
 * @property {import("./fetcher").ProjectFetcher} fetcher
 * @property {Zantt.ProjectModelType[]} [projects]
 * @property {(projectId: string) => void} [onSelectProject]
 */
export const ProjectNavBarProp = {
  selectedProjectId: PropTypes.string.isRequired,
  fetcher: PropTypes.object.isRequired,
  projects: PropTypes.array,
  onSelectProject: PropTypes.func,
}

/**
 * @param {ProjectNavBarPropType} props 
 * @returns {React.ReactElement}
 */
function ProjectNavBar(props) {
  /** @type {Zantt.ProjectModelType[]} */
  const projects = props.projects ? props.projects : props.fetcher.fetch();

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