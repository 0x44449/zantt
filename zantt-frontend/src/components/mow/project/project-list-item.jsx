import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef {object} ProjectListItemPropType
 * @property {string} projectId
 * @property {string} name
 * @property {(projectId: string) => void} [onSelect]
 */
export const ProjectListItemProp = {
  projectId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
}

/**
 * @param {ProjectListItemPropType} props 
 * @returns {React.ReactElement}
 */
function ProjectListItem(props) {
  /**
   * @param {React.MouseEvent<HTMLElement>} e 
   */
  const handleItemClick = (e) => {
    if (props.onSelect) {
      props.onSelect(props.projectId);
    }
  };

  return (
    <>
      <div>
        <div onClick={handleItemClick}>
          <div>{props.name}</div>
        </div>
      </div>
    </>
  )
}

ProjectListItem.propTypes = ProjectListItemProp;

export default ProjectListItem;