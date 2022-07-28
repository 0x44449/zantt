import PropTypes from "prop-types"
import { FC, ReactElement } from "react";

type TaskItemProps = {
  taskId: string;
  projectId: string;
  title: string;
  onSelect?: (projectId: string) => void;
}

const TaskItem: FC<TaskItemProps> = ({ taskId, projectId, title, onSelect }): ReactElement => {
  const handleItemClick = () => {
    if (onSelect) {
      onSelect(projectId);
    }
  };

  return (
    <div>
      <div onClick={handleItemClick}>
        <div>{title}</div>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  taskId: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};

export default TaskItem;