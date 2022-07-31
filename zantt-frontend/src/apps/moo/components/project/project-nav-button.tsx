import ProjectAvatar from "@/apps/moo/components/project/project-avatar";
import PropTypes from "prop-types";
import { FC, ReactElement } from "react";

type ProjectItemProps = {
  projectId: string;
  name: string;
  onSelect?: (projectId: string) => void;
  className?: string;
}

const ProjectNavButton: FC<ProjectItemProps> = ({ projectId, name, onSelect, className }): ReactElement => {
  const handleItemClick = () => {
    if (onSelect) {
      onSelect(projectId);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className ? className : ""}`}>
      <ProjectAvatar name={name} />
      <p className="mt-2 text-xs truncate w-full text-center">{name}</p>
    </div>
  )
}

ProjectNavButton.propTypes = {
  projectId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};

export default ProjectNavButton;