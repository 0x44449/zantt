import axios from "axios";

/**
 * @param {string} taskId 
 * @return {Promise<Zantt.ApiResponse<Zantt.WorkspaceModelType[]>>}
 */
 export async function getWorkspaces(taskId) {
  console.log("* call getWorkspace");
  /** @type {import("axios").AxiosResponse<Zantt.ApiResponse<Zantt.WorkspaceModelType[]>>} */
  const response = await axios.get("/workspace/workspaces", {
    params: {
      taskId: taskId,
    }
  });
  const data = response.data;
  return data;
}