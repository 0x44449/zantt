import PropTypes from "prop-types";

/**
 * @typedef {object} TimelineViewPropType
 * @property {string} projectId
 * @property {string} taskId
 * @property {string} workspaceId
 * @property {Zantt.TimelineModelType[]} timelines
 */
const TimelineViewProp = {
  projectId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  workspaceId: PropTypes.string.isRequired,
  timelines: PropTypes.array.isRequired,
}

/**
 * @param {TimelineViewPropType} props
 * @returns {React.ReactElement}
 */
function TimelineView(props) {
  return (
    <>
    </>
  )
}

TimelineView.propTypes = TimelineViewProp;

export default TimelineView;