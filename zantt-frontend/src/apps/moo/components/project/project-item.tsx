import PropTypes from "prop-types";
import { FC, ReactElement } from "react";

type ProjectItemProps = {
  projectId: string;
  name: string;
  onSelect?: (projectId: string) => void;
}

const ProjectItem: FC<ProjectItemProps> = ({ projectId, name, onSelect }): ReactElement => {
  const handleItemClick = () => {
    if (onSelect) {
      onSelect(projectId);
    }
  };

  return (
    <div>
      <div onClick={handleItemClick}>
        <div>{name}</div>
      </div>
    </div>
  )
}

ProjectItem.propTypes = {
  projectId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};

export default ProjectItem;