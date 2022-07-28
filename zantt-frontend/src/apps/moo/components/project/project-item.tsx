import PropTypes from "prop-types";
import { FC, ReactElement } from "react";

type ProjectItemProps = {
  projectId: string;
  name: string;
  onSelect?: (projectId: string) => void;
}

const getDisplayName = (name: string) => {
  if (!name) {
    return "-";
  }
  if (name.length === 1) {
    return name;
  }
  return `${name[0]}${name[1]}`;
}

const ProjectItem: FC<ProjectItemProps> = ({ projectId, name, onSelect }): ReactElement => {
  const handleItemClick = () => {
    if (onSelect) {
      onSelect(projectId);
    }
  };

  const displayName = getDisplayName(name);

  return (
    <div className="flex flex-col my-5 items-center">
      <div className="flex flex-col justify-center items-center w-11 h-11 bg-orange-400 rounded-full" onClick={handleItemClick}>
        <span className="truncate uppercase text-base font-medium text-slate-50">{displayName}</span>
      </div>
      <p className="pt-1 text-sm font-normal text-slate-50">{name}</p>
    </div>
  )
}

ProjectItem.propTypes = {
  projectId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};

export default ProjectItem;