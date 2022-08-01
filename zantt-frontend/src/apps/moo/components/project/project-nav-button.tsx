import ProjectAvatar from "@/apps/moo/components/project/project-avatar";
import PropTypes from "prop-types";
import { FC, ReactElement } from "react";

type ProjectItemProps = {
  name: string;
  className?: string;
}

const ProjectNavButton: FC<ProjectItemProps> = ({ name, className }): ReactElement => {
  return (
    <div className={`flex flex-col items-center justify-center ${className ? className : ""}`}>
      <ProjectAvatar name={name} />
      <p className="mt-2 text-xs truncate w-full text-center">{name}</p>
    </div>
  )
}

ProjectNavButton.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default ProjectNavButton;