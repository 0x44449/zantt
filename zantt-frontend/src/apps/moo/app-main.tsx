import { FC, ReactElement, Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router"
import ProjectNavBar from "@/apps/moo/controls/project/project-nav-bar";
import TaskList, { TaskListLoading } from "@/apps/moo/controls/task/task-list";
import { useAppDispatch } from "@/apps/moo/hooks/typed-redux-hook";
import { setProjectId } from "@/apps/moo/features/project-slice";
import { setTaskId } from "@/apps/moo/features/task-slice";
import { setWorkspaceId } from "@/apps/moo/features/workspace-slice";

const MooAppMain: FC = (): ReactElement => {
  const router = useRouter();
  const { slugs } = router.query;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!router.isReady) {
      console.log("router is not ready");
      return;
    }
    console.log("router is ready!!");

    const selectedProjectId = slugs ? (slugs[0] || "") : "";
    const selectedTaskId = slugs ? (slugs[1] || "") : "";
    const selectedWorkspaceId = slugs ? (slugs[2] || "") : "";

    dispatch(setProjectId(selectedProjectId));
    dispatch(setTaskId(selectedTaskId));
    dispatch(setWorkspaceId(selectedWorkspaceId));
  }, [router]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-row h-full">
        <div className="w-24">
          <Suspense fallback={<div>Loading Projects...</div>}>
            <ProjectNavBar />
          </Suspense>
        </div>
        <div className="w-96">
          <Suspense fallback={<TaskListLoading />}>
            <TaskList />
          </Suspense>
        </div>
        <div className="grow">
        </div>
      </div>
    </div>
  )
}

export default MooAppMain;