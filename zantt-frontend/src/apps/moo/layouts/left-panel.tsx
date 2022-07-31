import ProjectManageDropdown from "@/apps/moo/components/project/project-manage-dropdown";
import ProjectSummaryCard from "@/apps/moo/components/project/project-summary-card";
import TaskAddButtonWithModal from "@/apps/moo/components/task/task-add-button-with-modal";
import TaskList from "@/apps/moo/components/task/task-list";
import { useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import { selectCurrentProject } from "@/apps/moo/selectors/state-selector";
import { FC, ReactElement } from "react";

const LeftPanel: FC = (): ReactElement => {
  const currentProject = useAppSelector(selectCurrentProject());

  return (
    <div className="pl-1">
      <ProjectSummaryCard />
      <div className="mt-1">
        <TaskAddButtonWithModal />
      </div>
      <div className="mt-1">
        <TaskList />
      </div>
    </div>
  )
}

export default LeftPanel;