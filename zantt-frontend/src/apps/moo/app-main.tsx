import { FC, ReactElement, Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import ProjectNavBar from '@/apps/moo/controls/project-nav-bar';
import TaskList from '@/apps/moo/controls/task-list';
import { useAppDispatch } from '@/apps/moo/hooks/typed-redux-hook';
import { setProjectId } from '@/apps/moo/features/project-slice';
import { setTaskId } from '@/apps/moo/features/task-slice';
import { setWorkspaceId } from '@/apps/moo/features/workspace-slice';

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
    <div className="w-full flex flex-row">
      <div className="w-14 flex">
        <Suspense fallback={<div>Loading Projects...</div>}>
          <ProjectNavBar />
        </Suspense>
      </div>
      <div className="w-80">
        <Suspense fallback={<div>Loading Tasks...</div>}>
          <TaskList />
        </Suspense>
      </div>
      <div className="w-full">

      </div>
    </div>
  )
}

export default MooAppMain;