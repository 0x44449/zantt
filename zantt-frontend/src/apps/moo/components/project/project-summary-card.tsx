import { useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import { selectCurrentProject } from "@/apps/moo/selectors/state-selector";
import { FC, ReactElement } from "react";

const ProjectSummaryCard: FC = (): ReactElement => {
  const project = useAppSelector(selectCurrentProject());
  if (project === null) {
    return (<></>)
  }

  const name = project.name;

  return (
    <div className="flex flex-col p-6 pb-4 bg-gray-900">
      <div className="flex flex-col justify-center">
        <p className="truncate text-3xl font-bol">{name}</p>
        <div className="mt-2">
          <p className="text-base indent-4">sample description</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectSummaryCard;