import { useRouter } from 'next/router'
import Link from 'next/link'
import { getTasks } from '@/api/task';
import { getProjects } from '@/api/project';
import ProjectListItem from '@/components/moo/project/project-list-item';
import { useEffect, useState } from 'react';
import TaskListItem from '@/components/moo/task/task-list-item';

/**
 * @typedef {Zantt.SuspenderActionType<Zantt.ProjectModelType[]>} ProjectFetcher
 * @typedef {Zantt.SuspenderActionType<Zantt.TaskModelType[]>} TaskFetcher
 */
/**
 * @returns {ProjectFetcher}
 */
const getProjectFetcher = () => {
  /** @type {Zantt.ApiResponse<Zantt.ProjectModelType[]> | null} */
  let result = null;
  /** @type {"fetching" | "completed" | "error"} */
  let state = "fetching";
  const suspender = getProjects().then(data => {
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

export default function App() {
  const router = useRouter();
  /** @type {{slugs?: string[]}} */
  const { slugs } = router.query;

  /**
   * @typedef {object} SelectedStateType
   * @property {string} projectId
   * @property {string} taskId
   * @property {string} workspaceId
   */
  /** @type {[SelectedStateType, React.Dispatch<React.SetStateAction<SelectedStateType>>]} */
  const [selectedState, setSelectedState] = useState();
  /** @type {[Zantt.ProjectModelType[], React.Dispatch<React.SetStateAction<Zantt.ProjectModelType[]>>]} */
  const [projects, setProjects] = useState();
  /** @type {[Zantt.TaskModelType[], React.Dispatch<React.SetStateAction<Zantt.TaskModelType[]>>]} */
  const [tasks, setTasks] = useState();

  useEffect(() => {
    if (!router.isReady) {
      console.log("router is not ready");
      return;
    }

    /** @type {Zantt.ApiResponse<Zantt.ProjectModelType[]>} */
    const testProjects = {
      success: true,
      data: [{
        projectId: "1",
        name: "name1"
      }, {
        projectId: "2",
        name: "name2"
      }]
    };
    /** @type {Zantt.ApiResponse<Zantt.TaskModelType[]>} */
    const testTasks = {
      success: true,
      data: [{
        taskId: "1",
        projectId: "1",
        title: "title1"
      }, {
        taskId: "2",
        projectId: "1",
        title: "title2"
      }, {
        taskId: "3",
        projectId: "1",
        title: "title3"
      }, {
        taskId: "4",
        projectId: "1",
        title: "title4"
      }, {
        taskId: "5",
        projectId: "1",
        title: "title5"
      }]
    };
    setProjects(testProjects.data);
    setTasks(testTasks.data);
    setSelectedState({
      projectId: slugs[0] || "",
      taskId: slugs[1] || "",
      workspaceId: slugs[2] || "",
    });
  }, [router]);

  return (
    selectedState &&
    <>
      {projects.map(project => (
        <div key={project.projectId}>
          <Link href={`/moo/${project.projectId}`}>
            <a>
              <ProjectListItem
                projectId={project.projectId}
                name={project.name}
              />
            </a>
          </Link>
        </div>
      ))}
      {tasks.map(task => (
        <div key={task.taskId}>
          <Link href={`/moo/${task.projectId}/${task.taskId}`}>
            <a>
              <TaskListItem
                taskId={task.taskId}
                projectId={task.projectId}
                title={task.title}
              />
            </a>
          </Link>
        </div>
      ))}
    </>
  )
}