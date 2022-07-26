import { useRouter } from 'next/router'
import { getTasks } from '@/api/task';
import { getProjects } from '@/api/project';
import { Suspense, useEffect, useState } from 'react';
import ProjectNavBar from '@/layers/moo/project/project-nav-bar';
import { getProjectFetcher } from "@/layers/moo/project/fetcher";
import TaskList from '@/layers/moo/task/task-list';
import { getTaskFetcher } from '@/layers/moo/task/fetcher';

/**
 * @typedef {object} SelectedStateType
 * @property {string} projectId
 * @property {string} taskId
 * @property {string} workspaceId
 */
/**
 * 
 * @param {{selectedState: SelectedStateType, projects: Zantt.ProjectModelType[], tasks: Zantt.TaskModelType[]}} props 
 * @returns {React.ReactElement}
 */
export default function App(props) {
  const router = useRouter();
  /** @type {{slugs?: string[]}} */
  const { slugs } = router.query;

  /** @type {[SelectedStateType, React.Dispatch<React.SetStateAction<SelectedStateType>>]} */
  const [selectedState, setSelectedState] = useState({
    projectId: "",
    taskId: "",
    workspaceId: "",
  });
  /** @type {[Zantt.ProjectModelType[], React.Dispatch<React.SetStateAction<Zantt.ProjectModelType[]>>]} */
  const [projects, setProjects] = useState();
  /** @type {[Zantt.TaskModelType[], React.Dispatch<React.SetStateAction<Zantt.TaskModelType[]>>]} */
  const [tasks, setTasks] = useState();

  /** @type {[import('@/layers/moo/project/fetcher').ProjectFetcher, React.Dispatch<React.SetStateAction<import('@/layers/moo/project/fetcher').ProjectFetcher>>]} */
  const [projectsFetcher, setProjectsFetcher] = useState(getProjectFetcher());
  /** @type {[import('@/layers/moo/task/fetcher').TaskFetcher, React.Dispatch<React.SetStateAction<import('@/layers/moo/task/fetcher').TaskFetcher>>]} */
  const [tasksFetcher, setTasksFetcher] = useState(getTaskFetcher(""));

  useEffect(() => {
    if (!router.isReady) {
      console.log("router is not ready");
      return;
    }
    console.log("router is ready!!");

    console.log(slugs);
    setSelectedState({
      projectId: slugs[0] || "",
      taskId: slugs[1] || "",
      workspaceId: slugs[2] || "",
    });
    // setProjectsFetcher(getProjectFetcher());
    // console.log("set task fetcher -> " + (slugs[0] || ""));
    // setTasksFetcher(getTaskFetcher(slugs[0] || ""));
  }, [router]);

  useEffect(() => {
    console.log("set task fetcher -> " + selectedState.projectId);
    setTasksFetcher(getTaskFetcher(selectedState.projectId));
  }, [selectedState]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectNavBar
          selectedProjectId={selectedState.projectId}
          fetcher={projectsFetcher}
        />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <TaskList
          selectedProjectId={selectedState.projectId}
          selectedTaskId={selectedState.taskId}
          fetcher={tasksFetcher}
        />
      </Suspense>
    </>
  )
}

/**
 * SSR -> remove "xxx_"
 * @param {import("next").GetServerSidePropsContext} context 
 * @returns 
 */
export async function xxx_getServerSideProps(context) {
  //TODO: send to 500/404/302

  /** @type {{slugs?: string[]}} */
  const { slugs } = context.params;

  /** @type {SelectedStateType} */
  const selectedState = {
    projectId: slugs[0] || "",
    taskId: slugs[1] || "",
    workspaceId: slugs[2] || "",
  }

  /** @type {Zantt.ProjectModelType[]} */
  let projects = null;
  if (selectedState.projectId) {
    const projectsResponse = await getProjects();
    projects = projectsResponse.data;
  }

  /** @type {Zantt.TaskModelType[]} */
  let tasks = null;
  if (selectedState.taskId) {
    const tasksResponse = await getTasks(selectedState.taskId);
    tasks = tasksResponse.data;
  }

  return {
    props: {
      selectedState: selectedState,
      projects: projects,
      tasks: tasks,
    }
  }
}