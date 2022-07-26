import PropTypes from "prop-types"

/**
 * @typedef {object} TaskItemPropType
 * @property {string} taskId
 * @property {string} projectId
 * @property {string} title
 * @property {(projectId: string) => void} [onSelect]
 */
export const TaskItemProp = {
  taskId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
}

/**
 * @param {TaskItemPropType} props 
 * @returns {React.ReactElement}
 */
function TaskItem({ taskId, projectId, title, onSelect }) {
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
          <div>{title}</div>
        </div>
      </div>
    </>
  )
}

TaskItem.propTypes = TaskItemProp;

export default TaskItem;