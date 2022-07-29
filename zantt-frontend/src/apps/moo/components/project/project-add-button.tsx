import { FC, ReactElement } from "react";
import { PlusIcon } from "@heroicons/react/outline";

type ProjectAddButtonProps = {
  onClick?: () => void;
}

const ProjectAddButton: FC<ProjectAddButtonProps> = ({ onClick }): ReactElement => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col justify-center items-center py-5 w-full cursor-pointer">
      <PlusIcon className="text-slate-50 h-11 w-11" />
    </div>
  )
}

export default ProjectAddButton;