import PropTypes from "prop-types"

/**
 * @typedef {object} TimelineCommentPropType
 * @property {string} comment
 */
const TimelineCommentProp = {
  comment: PropTypes.string.isRequired
}

/**
 * @param {TimelineCommentPropType} props 
 * @returns {React.ReactElement}
 */
function TimelineComment({ comment }) {
  return (
    <div>
      <div>{comment}</div>
    </div>
  )
}

export default TimelineComment;