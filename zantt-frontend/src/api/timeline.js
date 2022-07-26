import axios from "axios";

/**
 * @param {string} projectId 
 * @param {string} taskId 
 * @param {string} workspaceId 
 * @return {Promise<Zantt.ApiResponse<Zantt.TimelineModelType[]>>}
 */
 export async function getTimelines(projectId, taskId, workspaceId) {
  console.log("* call getTimelines");
  /** @type {import("axios").AxiosResponse<Zantt.ApiResponse<Zantt.TimelineModelType[]>>} */
  const response = await axios.get("/timeline/timelines", {
    params: {
      projectId: projectId,
      taskId: taskId,
      workspaceId: workspaceId,
    }
  });
  const data = response.data;
  return data;
}