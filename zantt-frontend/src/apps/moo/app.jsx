import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router'
import ProjectNavBar from '@/apps/moo/controls/project-nav-bar';
import TaskList from '@/apps/moo/controls/task-list';
import { getProjectsCache, getProjectsFetcher } from "@/apps/moo/fetchers/project-fetcher";
import { getTasksCache, getTasksFetcher } from '@/apps/moo/fetchers/task-fetcher';
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjects } from '@/api/project';

const queryClient = new QueryClient();

/**
 * @returns {React.ReactElement}
 */
export default function MooApp() {
  const router = useRouter();
  /** @type {{slugs?: string[]}} */
  const { slugs } = router.query;

  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
  const [projectId, setProjectId] = useState("");
  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
  const [taskId, setTaskId] = useState("");
  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
  const [workspaceId, setWorkspaceId] = useState("");

  /** @type {[Zantt.ProjectModelType[], React.Dispatch<React.SetStateAction<Zantt.ProjectModelType[]>>]} */
  const [projects, setProjects] = useState();
  /** @type {[Zantt.TaskModelType[], React.Dispatch<React.SetStateAction<Zantt.TaskModelType[]>>]} */
  const [tasks, setTasks] = useState();

  useEffect(() => {
    if (!router.isReady) {
      console.log("router is not ready");
      return;
    }
    console.log("router is ready!!");

    const selectedProjectId = slugs ? slugs[0] : "";
    const selectedTaskId = slugs ? (slugs[1] || "") : "";
    const selectedWorkspaceId = slugs ? (slugs[2] || "") : "";

    setProjectId(selectedProjectId);
    setTaskId(selectedTaskId);
    setWorkspaceId(selectedWorkspaceId);
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading Global...</div>}>
        <ProjectNavBar
          projectId={projectId}
          projects={projects}
          setProjects={setProjects}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <TaskList
            projectId={projectId}
            taskId={taskId}
            tasks={tasks}
            setTasks={setTasks}
          />
        </Suspense>
      </Suspense>
    </QueryClientProvider>
  )
}