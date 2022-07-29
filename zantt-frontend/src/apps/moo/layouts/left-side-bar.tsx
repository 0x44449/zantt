import ProjectStickyAddButton from "@/apps/moo/components/project/project-sticky-add-button";
import ProjectNavBar from "@/apps/moo/components/project/project-nav-bar";
import { FC, ReactElement } from "react";
import ProjectVerticalScrollable from "@/apps/moo/components/project/project-vertical-scrollable";
import { selectIsProjectFetching } from "@/apps/moo/selectors/state-selector";
import { useSelector } from "react-redux";
import ProjectNavBarSkeleton from "@/apps/moo/components/project/project-nav-bar-skeleton";
import { useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";

const LeftSideBar: FC = (): ReactElement => {
  const isProjectFetching = useSelector(selectIsProjectFetching());

  return (
    <div className="h-full bg-gray-800">
      {isProjectFetching ? (
        <div className="animate-pulse">
          <ProjectStickyAddButton />
          <ProjectNavBarSkeleton />
        </div>
      ) : (
        <ProjectVerticalScrollable>
          <ProjectStickyAddButton />
          <ProjectNavBar />
        </ProjectVerticalScrollable>
      )}
    </div>
  )
}

export default LeftSideBar;