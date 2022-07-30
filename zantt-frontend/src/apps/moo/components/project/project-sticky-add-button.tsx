import { FC, ReactElement } from "react";
import { PlusIcon } from "@heroicons/react/outline";

type ProjectAddButtonProps = {
  className?: string;
  onClick?: () => void;
}

const ProjectStickyAddButton: FC<ProjectAddButtonProps> = ({ onClick, className }): ReactElement => {
  return (
    <div onClick={onClick} className={`flex flex-col justify-center items-center sticky top-0 ${className ? className : ""}`}>
      <div className="avatar placeholder cursor-pointer">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-11">
          <PlusIcon className="text-baase w-4" />
        </div>
      </div>
    </div>
  )
}

export default ProjectStickyAddButton;