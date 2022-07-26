import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router'
import ProjectNavBar from '@/apps/moo/controls/project-nav-bar';
import TaskList from '@/apps/moo/controls/task-list';
import { getProjectsCache, getProjectsFetcher } from "@/apps/moo/fetchers/project-fetcher";
import { getTasksCache, getTasksFetcher } from '@/apps/moo/fetchers/task-fetcher';

/**
 * @returns {React.ReactElement}
 */
export default function App() {
  const router = useRouter();
  /** @type {{slugs?: string[]}} */
  const { slugs } = router.query;

  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
  const [projectId, setProjectId] = useState("");
  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
  const [taskId, setTaskId] = useState("");
  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
  const [workspaceId, setWorkspaceId] = useState("");

  /** @type {import('@/apps/moo/fetchers/project-fetcher').ProjectFetcher} */
  const projectsFetcher = useMemo(() => {
    console.log("projectsFetcher memoize");
    return getProjectsFetcher();
  }, []);
  /** @type {import('@/apps/moo/fetchers/task-fetcher').TaskFetcher} */
  const tasksFetcher = useMemo(() => {
    console.log("tasksFetcher memoize");
    return getTasksFetcher(projectId);
  }, [projectId]);

  useEffect(() => {
    if (!router.isReady) {
      console.log("router is not ready");
      return;
    }
    console.log("router is ready!!");

    const selectedProjectId = slugs[0] || "";
    const selectedTaskId = slugs[1] || "";
    const selectedWorkspaceId = slugs[2] || "";

    setProjectId(selectedProjectId);
    setTaskId(selectedTaskId);
    setWorkspaceId(selectedWorkspaceId);
  }, [router]);

  return (
    <>
      <Suspense fallback={<div>Loading Global...</div>}>
        <ProjectNavBar
          projectId={projectId}
          fetcher={projectsFetcher}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <TaskList
            projectId={projectId}
            taskId={taskId}
            fetcher={tasksFetcher}
          />
        </Suspense>
      </Suspense>
    </>
  )
}