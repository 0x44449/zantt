import ProjectNavBar from "@/apps/moo/components/project/project-nav-bar";
import { FC, ReactElement } from "react";
import { useIsProjectFetchingSelector } from "@/apps/moo/selectors/state-selector";
import ProjectAddButtonWithModal from "@/apps/moo/components/project/project-add-button-with-modal";

const LeftSideBar: FC = (): ReactElement => {
  const isProjectFetching = useIsProjectFetchingSelector();

  return (
    <div className="h-full bg-gray-800">
      <div className="h-full overflow-y-auto overflow-x-hidden">
        {/** viewport */}
        <div className="flex-1">
          {/** sticky */}
          <div className="sticky top-0">
            <ProjectAddButtonWithModal />
          </div>
          <ProjectNavBar />
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar;