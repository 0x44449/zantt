import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { getTasks } from '@/api/task';
import { getProjects } from '@/api/project';
import ProjectNavBar from '@/apps/moo/project/project-nav-bar';
import TaskList from '@/apps/moo/task/task-list';
import { getProjectsFetcher } from "@/apps/moo/project/fetcher";
import { getTasksFetcher } from '@/apps/moo/task/fetcher';

/**
 * @typedef {object} SelectedStateType
 * @property {string} projectId
 * @property {string} taskId
 * @property {string} workspaceId
 */
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
  /** @type {[Zantt.ProjectModelType[], React.Dispatch<React.SetStateAction<Zantt.ProjectModelType[]>>]} */
  const [projects, setProjects] = useState();
  /** @type {[Zantt.TaskModelType[], React.Dispatch<React.SetStateAction<Zantt.TaskModelType[]>>]} */
  const [tasks, setTasks] = useState();

  /** @type {[import('@/apps/moo/project/fetcher').ProjectFetcher, React.Dispatch<React.SetStateAction<import('@/apps/moo/project/fetcher').ProjectFetcher>>]} */
  const [projectsFetcher, setProjectsFetcher] = useState(getProjectsFetcher());
  /** @type {[import('@/apps/moo/task/fetcher').TaskFetcher, React.Dispatch<React.SetStateAction<import('@/apps/moo/task/fetcher').TaskFetcher>>]} */
  const [tasksFetcher, setTasksFetcher] = useState(getTasksFetcher(""));

  useEffect(() => {
    if (!router.isReady) {
      console.log("router is not ready");
      return;
    }
    console.log("router is ready!!");

    const selectedProjectId = slugs[0] || "";
    const selectedTaskId = slugs[1] || "";
    const selectedWorkspaceId = slugs[2] || "";

    if (projectId !== selectedProjectId) {
      setTasksFetcher(getTasksFetcher(selectedProjectId));
    }

    if (projectId !== selectedProjectId) {
      setProjectId(selectedProjectId);
    }
    if (taskId !== selectedTaskId) {
      setTaskId(selectedTaskId);
    }
    if (workspaceId !== selectedWorkspaceId) {
      setWorkspaceId(selectedWorkspaceId);
    }
  }, [router]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectNavBar
          selectedProjectId={""}
          fetcher={projectsFetcher}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <TaskList
          selectedProjectId={""}
          selectedTaskId={""}
          fetcher={tasksFetcher}
        />
      </Suspense>
    </>
  )
}