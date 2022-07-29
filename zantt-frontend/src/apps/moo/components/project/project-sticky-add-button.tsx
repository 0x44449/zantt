import { FC, ReactElement } from "react";
import { PlusIcon } from "@heroicons/react/outline";

type ProjectAddButtonProps = {
  onClick?: () => void;
}

const ProjectStickyAddButton: FC<ProjectAddButtonProps> = ({ onClick }): ReactElement => {
  return (
    <div className="flex flex-col sticky top-0 bg-gray-800 hover:bg-slate-700">
      <div
        onClick={onClick}
        className="flex flex-col justify-center items-center py-5 w-full cursor-pointer">
        <PlusIcon className="text-slate-50 h-11 w-11" />
      </div>
    </div>
  )
}

export default ProjectStickyAddButton;