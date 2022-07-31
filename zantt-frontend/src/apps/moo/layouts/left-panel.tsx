import ProjectSummaryCard from "@/apps/moo/components/project/project-summary-card";
import TaskAddButtonWithModal from "@/apps/moo/components/task/task-add-button-with-modal";
import TaskList from "@/apps/moo/components/task/task-list";
import { FC, ReactElement } from "react";

const LeftPanel: FC = (): ReactElement => {

  return (
    <div className="pl-1 h-full">
      {/** scroller */}
      <div className="h-full overflow-y-auto overflow-x-hidden">
        {/** viewport */}
        <div className="flex-1">
          {/** sticky */}
          <div className="sticky top-0">
            <ProjectSummaryCard />
            <div className="mt-1">
              <TaskAddButtonWithModal />
            </div>
          </div>
          {/** list */}
          <div className="mt-2">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftPanel;