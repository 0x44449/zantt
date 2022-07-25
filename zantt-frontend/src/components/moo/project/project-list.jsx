import React from "react";
import PropTypes from "prop-types";
import ProjectListItem, { ProjectListItemProp } from "./project-list-item";

/**
 * @typedef {object} ProjectListPropType
 * @property {import("./project-list-item").ProjectListItemPropType[]} projects
 * @property {(projectId: string) => void} [onSelectProject]
 */
const ProjectListProp = {
  projects: PropTypes.arrayOf(PropTypes.shape(ProjectListItemProp)).isRequired,
  onSelectProject: PropTypes.func,
}

/**
 * 
 * @param {ProjectListPropType} props 
 * @returns {React.ReactElement}
 */
function ProjectList(props) {
  /**
   * @param {string} projectId 
   */
  const handleSelectItem = (projectId) => {
    if (props.onSelectProject) {
      props.onSelectProject(projectId);
    }
  };

  return (
    <>
      <div>
        {props.projects.map(project => (
          <ProjectListItem
            key={project.projectId}
            projectId={project.projectId}
            name={project.name}
            onSelect={handleSelectItem}
          />
        ))}
      </div>
    </>
  )
}

ProjectList.propTypes = ProjectListProp;

export default ProjectList;