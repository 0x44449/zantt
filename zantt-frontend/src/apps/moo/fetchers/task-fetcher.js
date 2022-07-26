import { getTasks } from "@/api/task";

/** @type {Zantt.TaskModelType[]} */
let tasksCache = [];

/**
 * @typedef {Zantt.SuspenderActionType<Zantt.ProjectModelType[]>} ProjectFetcher
 * @typedef {Zantt.SuspenderActionType<Zantt.TaskModelType[]>} TaskFetcher
 */
/**
 * @param {string} projectId 
 * @returns {TaskFetcher}
 */
export const getTasksFetcher = (projectId) => {
  if (!projectId) {
    return {
      fetch() {
        console.log(`tasks fetch return empty`);
        tasksCache = [];
        return tasksCache;
      }
    }
  }

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
    fetch() {
      console.log(`tasks fetcher state: ${state}`);
      if (state === "fetching") {
        throw suspender;
      }
      else if (state === "completed") {
        tasksCache = result.data;
        return tasksCache;
      }
      else if (state === "error") {
        throw result;
      }
    }
  }
}

/**
 * @returns {Zantt.TaskModelType[]}
 */
export const getTasksCache = () => {
  return tasksCache;
}