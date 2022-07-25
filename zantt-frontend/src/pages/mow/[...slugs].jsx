import { useRouter } from "next/router";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import ProjectList from "@/components/mow/project/project-list";
import TaskList from "@/components/mow/task/task.list";
import { getProjects } from "@/api/mow/project";
import { getTasks } from "@/api/mow/task";

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
 * @param {{fetcher: TaskFetcher}} props 
 * @returns {React.ReactElement}
 */
function TaskListRender({fetcher}) {
  const tasks = fetcher.read();

  return (
    <>
      <TaskList tasks={tasks.map(task => {
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
 * @param {{projects?: Zantt.ProjectModelType[]}} props
 * @returns {React.ReactElement}
 */
export default function MowApp({projects}) {
  const router = useRouter();
  /** @type {{slugs?: string[]}} */
  const { slugs } = router.query;

  /**
   * @typedef {object} MowStateType
   * @property {string} projectId
   * @property {string} taskId
   * @property {string} workspaceId
   */
  /** @type {[MowStateType, React.Dispatch<React.SetStateAction<MowStateType>>]} */
  const [mowState, setMowState] = useState();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!slugs) {
      return;
    }
    if (slugs.length > 3) {
      return;
    }

    setMowState({
      projectId: slugs[0] || "",
      taskId: slugs[1] || "",
      workspaceId: slugs[2] || "",
    });
    console.log(mowState);
  }, [router.isReady]);

  /**
   * @param {string} projectId 
   */
  const handleSelectProject = (projectId) => {
    console.log(`select project: ${projectId}`);
    router.push(`/mow/${projectId}/bbb/ccc`);
  }

  return (
    mowState &&
    <>
      <ProjectList projects={projects.map(project => {
        return {
          projectId: project.projectId,
          name: project.name,
        }
      })} onSelectProject={handleSelectProject} />
      <Suspense fallback={<>Loading...</>}>
        <TaskListRender fetcher={getTaskFetcher(mowState.projectId)} />
      </Suspense>
    </>
  )
}

export async function getServerSideProps() {
  const projects = await getProjects();
  //TODO: send to 500/404/302

  return {
    props: {
      projects: projects.data
    }
  }
}