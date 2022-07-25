import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef {object} ProjectListItemPropType
 * @property {string} name
 */
const ProjectListItemProp = {
  name: PropTypes.string.isRequired
}

/**
 * @param {ProjectListItemPropType} props 
 * @returns {React.ReactElement}
 */
function ProjectListItem(props) {
  return (
    <>
      <div>
        <div>{props.name}</div>
      </div>
    </>
  )
}

ProjectListItem.propTypes = ProjectListItemProp;

export default ProjectListItem;