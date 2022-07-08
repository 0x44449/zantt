import React from "react";
import PropTypes from "prop-types";

/**
 * @typedef {object} ProjectItemPropTypes
 * @property {string} title
 */
const ProjectItemProp = {
  title: PropTypes.string.isRequired
};

/**
 * @param {ProjectItemPropTypes} props
 * @returns {React.ReactElement}
 */
function ProjectItem(props) {
  return (
    <>
      <div>
        {props.title}
      </div>
    </>
  );
}

ProjectItem.propTypes = ProjectItemProp;

export default ProjectItem;