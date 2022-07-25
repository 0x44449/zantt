import { useRouter } from "next/router";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { getProjects } from "@/api/project";
import { getTasks } from "@/api/task";
import ProjectList from "@/components/moo/project/project-list";
import ProjectListItem from "@/components/moo/project/project-list-item";
import TaskList from "@/components/moo/task/task.list";
import Link from "next/link";

/**
 * @typedef {Zantt.SuspenderActionType<Zantt.TaskModelType[]>} TaskFetcher
 */
/**
 * @param {string} projectId 
 * @returns {TaskFetcher}
 */
const getTaskFetcher = (projectId) => {
  /** @type {Zantt.ApiResponse<Zantt.TaskModelType[]> | null} */
  let result = null;
  /** @type {"fetching" | "completed" | "error"} */
  let state = "fetching";
  const suspender = getTasks(projectId).then(data => {
    result = data;
    state = "completed";
  }).catch(e => {
    result = e;
    state = "error";
  });

  return {
    read() {
      if (state === "fetching") {
        throw suspender;
      }
      else if (state === "completed") {
        return result.data;
      }
      else if (state === "error") {
        throw result;
      }
    }
  }
}

/**
 * @param {{fetcher: TaskFetcher, tasks: Zantt.TaskModelType[] | null}} props 
 * @returns {React.ReactElement}
 */
function TaskListRender({ fetcher, tasks }) {
  /** @type {Zantt.TaskModelType[]} */
  let data = tasks;
  if (data == null) {
    data = fetcher.read();
  }

  return (
    <>
      <TaskList tasks={data.map(task => {
        return {
          taskId: task.taskId,
          projectId: task.projectId,
          title: task.title,
        }
      })} />
    </>
  )
}

/**
 * @typedef {object} MowStateType
 * @property {string} projectId
 * @property {string} taskId
 * @property {string} workspaceId
 */
/**
 * @typedef {object} MowAppType
 * @property {MowStateType} state
 * @property {Zantt.ProjectModelType[]} projects
 * @property {Zantt.TaskModelType[] | null} tasks
 */
/**
 * @param {MowAppType} props
 * @returns {React.ReactElement}
 */
export default function MowApp(props) {
  const router = useRouter();
  /** @type {{slugs?: string[]}} */
  const { slugs } = router.query;

  /** @type {[MowStateType, React.Dispatch<React.SetStateAction<MowStateType>>]} */
  const [mowState, setMowState] = useState();

  /** @type {[MowAppType, React.Dispatch<React.SetStateAction<MowAppType>>]} */
  const [mowApp, setMowApp] = useState();

  useEffect(() => {
    console.log('router dependency useEffect call');
    if (!router.isReady) {
      return;
    }
    if (!slugs) {
      return;
    }
    if (slugs.length > 3) {
      return;
    }

    // check server props
    if (props) {
      // use server props
      setMowApp(props);
      console.log('server props')
      console.log(props);
    }
    else {
      // create client props
      const mowState = {
        projectId: slugs[0] || "",
        taskId: slugs[1] || "",
        workspaceId: slugs[2] || "",
      }
      console.log('client props')
    }

    setMowState({
      projectId: slugs[0] || "",
      taskId: slugs[1] || "",
      workspaceId: slugs[2] || "",
    });
    console.log(mowState);
  }, [router]);

  /**
   * @param {string} projectId 
   */
  const handleSelectProject = (projectId) => {
    console.log(projectId);
    router.push(`/mow/${projectId}/bbb/ccc`);
  }

  const handleSelectTask = (taskId) => {
    console.log(taskId);
    router.push(`/mow/${mowState.projectId}/${taskId}/ccc`);
  }

  return (
    mowState &&
    <>
      {/* <ProjectList projects={props.projects.map(project => {
        return {
          projectId: project.projectId,
          name: project.name,
        }
      })} onSelectProject={handleSelectProject} /> */}
      {props.projects.map(project => (
        <div key={project.projectId}>
          <Link href={`/mow/${encodeURIComponent(project.projectId)}`}>
            <a>
              <ProjectListItem
                projectId={project.projectId}
                name={project.name}
                // onSelect={handleSelectProject}
              />
            </a>
          </Link>
        </div>
      ))}
      <Suspense fallback={<>Loading...</>}>
        <TaskListRender tasks={props.tasks} fetcher={getTaskFetcher(mowState.projectId)} />
        {/* <TaskList tasks={props.tasks.map(task => {
          return {
            taskId: task.taskId,
            projectId: task.projectId,
            title: task.title,
          }
        })} onSelectTask={handleSelectTask} /> */}
      </Suspense>
    </>
  )
}

/**
 * @param {import("next").GetServerSidePropsContext} context 
 * @returns {Promise<{props: MowAppType}>}
 */
export async function getServerSideProps(context) {
  const projects = await getProjects();

  /** @type {{slugs?: string[]}} */
  const { slugs } = context.params;

  //TODO: send to 500/404/302
  if (!slugs && slugs.length < 3) {
    
  }

  /** @type {MowStateType} */
  const mowState = {
    projectId: slugs[0] || "",
    taskId: slugs[1] || "",
    workspaceId: slugs[2] || "",
  }
  /** @type {MowAppType} */
  const mowApp = {
    state: mowState,
    projects: projects.data,
    tasks: null,
  }

  if (mowState.projectId) {
    const tasks = await getTasks(mowState.projectId);
    mowApp.tasks = tasks.data;
  }

  return {
    props: mowApp
  }
}