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
function TaskItem(props) {
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

TaskItem.propTypes = TaskItemProp;

export default TaskItem;