import axios from "axios";

import "@/api/mock/task";

/**
 * @param {string} projectId 
 * @return {Promise<Zantt.ApiResponse<Zantt.TaskModelType[]>>}
 */
export async function getTasks(projectId) {
  /** @type {import("axios").AxiosResponse<Zantt.ApiResponse<Zantt.TaskModelType[]>>} */
  const response = await axios.get("/task/tasks", {
    params: {
      projectId: projectId
    }
  });
  const data = response.data;
  return data;
}