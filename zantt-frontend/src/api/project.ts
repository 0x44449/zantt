import axios from "axios";

// import "@/api/mock/project";

export async function getProjects() {
  console.log("* call getProjects");
  const response = await axios.get<Zantt.ApiResponse<Zantt.ProjectModelType[]>>("/project/projects");
  const data = response.data;
  return data;
}

export async function addProject(name: string) {
  console.log(`* call addProject -> `);
  const response = await axios.post<Zantt.ApiResponse<null>>("/project", {
    name: name
  });
  const data = response.data;
  return data;
}