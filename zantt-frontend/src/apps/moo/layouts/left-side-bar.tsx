import ProjectNavBar from "@/apps/moo/components/project/project-nav-bar";
import { FC, ReactElement } from "react";
import { useIsProjectFetchingSelector } from "@/apps/moo/selectors/state-selector";
import ProjectAddButtonWithModal from "@/apps/moo/components/project/project-add-button-with-modal";
import VerticalScrollable from "@/apps/moo/components/common/vertical-scrollable";

const LeftSideBar: FC = (): ReactElement => {
  const isProjectFetching = useIsProjectFetchingSelector();

  return (
    <div className="h-full bg-gray-800">
      <VerticalScrollable>
        {/** sticky */}
        <div className="sticky top-0">
          <ProjectAddButtonWithModal />
        </div>
        <ProjectNavBar />
      </VerticalScrollable>
    </div>
  )
}

export default LeftSideBar;