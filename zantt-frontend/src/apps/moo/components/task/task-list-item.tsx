import PropTypes from "prop-types"
import { FC, ReactElement } from "react";

type TaskItemProps = {
  taskId: string;
  projectId: string;
  title: string;
  onSelect?: (projectId: string) => void;
}

const TaskListItem: FC<TaskItemProps> = ({ taskId, projectId, title, onSelect }): ReactElement => {
  const handleItemClick = () => {
    if (onSelect) {
      onSelect(projectId);
    }
  };

  return (
    <div className="flex flex-col px-4 py-4 bg-gray-900">
      <div onClick={handleItemClick}>
        <div className="">{title}</div>
      </div>
    </div>
  )
}

export default TaskListItem;