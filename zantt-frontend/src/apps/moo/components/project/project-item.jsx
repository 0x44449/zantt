import PropTypes from "prop-types";

/**
 * @typedef {object} ProjectItemPropType
 * @property {string} projectId
 * @property {string} name
 * @property {(projectId: string) => void} [onSelect]
 */
export const ProjectItemProp = {
  projectId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
}

/**
 * @param {ProjectItemPropType} props 
 * @returns {React.ReactElement}
 */
function ProjectItem({ projectId, name, onSelect }) {
  /**
   * @param {React.MouseEvent<HTMLElement>} e 
   */
  const handleItemClick = (e) => {
    if (onSelect) {
      onSelect(projectId);
    }
  };

  return (
    <>
      <div>
        <div onClick={handleItemClick}>
          <div>{name}</div>
        </div>
      </div>
    </>
  )
}

ProjectItem.propTypes = ProjectItemProp;

export default ProjectItem;