import { getProjects } from "@/api/project";

/**
 * @typedef {Zantt.SuspenderActionType<Zantt.ProjectModelType[]>} ProjectFetcher
 */
/**
 * @returns {ProjectFetcher}
 */
export const getProjectFetcher = () => {
  /** @type {Zantt.ApiResponse<Zantt.ProjectModelType[]> | null} */
  let result = null;
  /** @type {"fetching" | "completed" | "error"} */
  let state = "fetching";
  const suspender = getProjects().then(data => {
    result = data;
    state = "completed";
    // console.log("project fetch completed");
  }).catch(e => {
    result = e;
    state = "error";
    console.log("project fetch error");
  });

  return {
    fetch() {
      console.log("poject fecther state: " + state);
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