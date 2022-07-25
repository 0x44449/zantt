import React from "react";
import PropTypes from "prop-types";
import TaskListItem, { TaskListItemProp } from "./task-list-item";

/**
 * @typedef {object} TaskListPropType
 * @property {import("./task-list-item").TaskListItemPropType[]} tasks
 * @property {(taskId: string) => void} [onSelectTask]
 */
const TaskListProp = {
  tasks: PropTypes.arrayOf(PropTypes.shape(TaskListItemProp)).isRequired,
  onSelectTask: PropTypes.func,
}

/**
 * 
 * @param {TaskListPropType} props 
 * @returns {React.ReactElement}
 */
function TaskList(props) {
  /**
   * @param {string} taskId 
   */
  const handleSelectItem = (taskId) => {
    if (props.onSelectTask) {
      props.onSelectTask(taskId);
    }
  };

  return (
    <>
      <div>
        {props.tasks.map(task => (
          <TaskListItem
            key={task.taskId}
            taskId={task.taskId}
            projectId={task.projectId}
            title={task.title}
            onSelect={handleSelectItem}
          />
        ))}
      </div>
    </>
  )
}

TaskList.propTypes = TaskListProp;

export default TaskList;