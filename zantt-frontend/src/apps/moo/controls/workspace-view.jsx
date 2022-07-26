import PropTypes from "prop-types";

/**
 * @typedef {object} WorkspaceViewPropType
 * @property {string} projectId
 * @property {string} taskId
 * @property {Zantt.WorkspaceModelType} workspace
 */
const WorkspaceViewProp = {
  projectId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  workspace: PropTypes.object.isRequired,
}

/**
 * @param {WorkspaceViewPropType} props
 * @returns {React.ReactElement}
 */
function WorkspaceView(props) {
  return (
    <>
      <div>
        <div>{props.workspace.contents}</div>
      </div>
    </>
  )
}

WorkspaceView.propTypes = WorkspaceViewProp;

export default WorkspaceView;