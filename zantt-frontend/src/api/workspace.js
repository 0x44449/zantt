import axios from "axios";

/**
 * @param {string} projectId 
 * @param {string} taskId 
 * @return {Promise<Zantt.ApiResponse<Zantt.WorkspaceModelType>>}
 */
 export async function getWorkspace(projectId, taskId) {
  console.log("* call getWorkspace");
  /** @type {import("axios").AxiosResponse<Zantt.ApiResponse<Zantt.WorkspaceModelType>>} */
  const response = await axios.get("/workspace", {
    params: {
      projectId: projectId,
      taskId: taskId,
    }
  });
  const data = response.data;
  return data;
}