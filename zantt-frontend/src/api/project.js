import axios from "axios";

import "@/api/mock/project";

/**
 * @return {Promise<Zantt.ApiResponse<Zantt.ProjectModelType[]>>}
 */
export async function getProjects() {
  /** @type {import("axios").AxiosResponse<Zantt.ApiResponse<Zantt.ProjectModelType[]>>} */
  const response = await axios.get("/project/projects");
  const data = response.data;
  return data;
}
