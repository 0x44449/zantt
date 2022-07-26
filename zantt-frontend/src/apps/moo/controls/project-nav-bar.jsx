import ProjectItem from "@/apps/moo/components/project/project-item";
import Link from "next/link";
import PropTypes from "prop-types";

/**
 * @typedef {object} ProjectNavBarPropType
 * @property {string} projectId
 * @property {import("../fetchers/project-fetcher").ProjectFetcher} [fetcher]
 * @property {Zantt.ProjectModelType[]} [projects]
 * @property {(projectId: string) => void} [onSelectProject]
 */
export const ProjectNavBarProp = {
  projectId: PropTypes.string.isRequired,
  fetcher: PropTypes.object,
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