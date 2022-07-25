import React from "react";
import PropTypes from "prop-types"

/**
 * @typedef {object} TaskListItemPropType
 * @property {string} taskId
 * @property {string} projectId
 * @property {string} title
 * @property {(projectId: string) => void} [onSelect]
 */
export const TaskListItemProp = {
  taskId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
}

/**
 * @param {TaskListItemPropType} props 
 * @returns {React.ReactElement}
 */
function TaskListItem(props) {
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
          <div>{props.title}</div>
        </div>
      </div>
    </>
  )
}

TaskListItem.propTypes = TaskListItemProp;

export default TaskListItem;