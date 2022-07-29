import ProjectAvatar from "@/apps/moo/components/project/project-avatar";
import PropTypes from "prop-types";
import { FC, ReactElement } from "react";

type ProjectItemProps = {
  projectId: string;
  name: string;
  onSelect?: (projectId: string) => void;
}

const ProjectNavButton: FC<ProjectItemProps> = ({ projectId, name, onSelect }): ReactElement => {
  const handleItemClick = () => {
    if (onSelect) {
      onSelect(projectId);
    }
  };

  return (
    <div className="flex flex-col py-4 px-3 items-center justify-center">
      <ProjectAvatar name={name} />
      <p className="pt-1 text-sm font-normal text-slate-50">{name}</p>
    </div>
  )
}

ProjectNavButton.propTypes = {
  projectId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};

export default ProjectNavButton;