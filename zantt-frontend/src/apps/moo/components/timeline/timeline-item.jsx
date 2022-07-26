import PropTypes from "prop-types";

/**
 * @typedef {object} TimelineItemPropType
 * @property {string} timelineType
 */
const TimelineItemProp = {
  projectId: PropTypes.string.isRequired,
  taskId: PropTypes.string.isRequired,
  workspaceId: PropTypes.string.isRequired,
  timelineId: PropTypes.string.isRequired,
  timelineType: PropTypes.string.isRequired,
}

/**
 * 
 * @param {TimelineItemPropType} props 
 * @returns {React.ReactElement}
 */
function TimelineItem({ timelineType }) {
  return (
    <>
      <div>
        <div>{timelineType}</div>
      </div>
    </>
  )
}

TimelineItem.propTypes = TimelineItemProp;

export default TimelineItem;