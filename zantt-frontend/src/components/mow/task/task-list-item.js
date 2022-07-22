import React from "react";
import PropTypes from "prop-types"

/**
 * @typedef {object} TaskListItemPropType
 * @property {string} title
 * @property {Date} createdDate
 * @property {Date} modifiedDate
 */
const TaskListItemProp = {
  title: PropTypes.string.isRequired,
  createdDate: PropTypes.instanceOf(Date).isRequired,
  modifiedDate: PropTypes.instanceOf(Date).isRequired
}

/**
 * @param {TaskListItemPropType} props 
 * @returns {React.ReactElement}
 */
function TaskListItem(props) {
  
  return (
    <>
      <div>
        <div>{props.title}</div>
        <div>{props.createdDate}</div>
      </div>
    </>
  )
}

TaskListItem.propTypes = TaskListItemProp;

export default TaskListItem;