import PropTypes from "prop-types";

/**
 * @typedef {object} WorkspaceItemPropType
 * @property {string} title
 * @property {string} contents
 */
const WorkspaceItemProp = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
}

/**
 * 
 * @param {WorkspaceItemPropType} props 
 * @returns {React.ReactElement}
 */
function WorkspaceItem({ title, contents }) {
  return (
    <>
      <div>
        <div>{title}</div>
        <div>{contents}</div>
      </div>
    </>
  )
}

WorkspaceItem.propTypes = WorkspaceItemProp;

export default WorkspaceItem;