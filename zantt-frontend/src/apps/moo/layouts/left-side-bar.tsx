import ProjectStickyAddButton from "@/apps/moo/components/project/project-sticky-add-button";
import ProjectNavBar from "@/apps/moo/components/project/project-nav-bar";
import { FC, ReactElement } from "react";
import ProjectVerticalScrollable from "@/apps/moo/components/project/project-vertical-scrollable";
import { selectIsProjectFetching } from "@/apps/moo/selectors/state-selector";
import { useSelector } from "react-redux";
import ProjectAddModal from "@/apps/moo/components/project/project-add-modal";
import ModalWithButton from "@/apps/moo/components/common/modal-with-button";

const LeftSideBar: FC = (): ReactElement => {
  const isProjectFetching = useSelector(selectIsProjectFetching());

  return (
    <div className="h-full bg-gray-800">
      {isProjectFetching ? (
        <div className="animate-pulse">
        </div>
      ) : (
        <ProjectVerticalScrollable>
          <ModalWithButton
            modalId="moo-project-add"
            buttonLabel=""
            buttonComponent={<ProjectStickyAddButton />}
            buttonClassName="flex flex-col justify-center items-center sticky top-0 p-3"
          >
            <ProjectAddModal />
          </ModalWithButton>
          <ProjectNavBar />
        </ProjectVerticalScrollable>
      )}
    </div>
  )
}

export default LeftSideBar;