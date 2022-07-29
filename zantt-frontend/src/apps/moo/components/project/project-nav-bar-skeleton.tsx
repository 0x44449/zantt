import { getProjects } from "@/api/project";
import ProjectVerticalScrollable from "@/apps/moo/components/project/project-vertical-scrollable";
import ProjectStickyAddButton from "@/apps/moo/components/project/project-sticky-add-button";
import ProjectNavButton from "@/apps/moo/components/project/project-nav-button";
import { setProjects } from "@/apps/moo/features/project-slice";
import { useAppDispatch, useAppSelector } from "@/apps/moo/hooks/typed-redux-hook";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC, ReactElement, useEffect } from "react";
import ProjectNavButtonSkeleton from "@/apps/moo/components/project/project-nav-button-skeleton";

const ProjectNavBarSkeleton: FC = (): ReactElement => {
  return (
    <div className="flex flex-col">
      <ProjectNavButtonSkeleton />
      <ProjectNavButtonSkeleton />
      <ProjectNavButtonSkeleton />
      <ProjectNavButtonSkeleton />
    </div>
  )
}

export default ProjectNavBarSkeleton;