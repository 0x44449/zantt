import axios from "axios";

// import "@/api/mock/task";

export async function getTasks(projectId: string) {
  console.log("* call getTasks -> " + projectId);
  const response = await axios.get<Zantt.ApiResponse<Zantt.TaskModelType[]>>("/task/tasks", {
    params: {
      projectId: projectId
    }
  });
  const data = response.data;
  return data;
}

export async function addTask(projectId: string, title: string) {
  console.log(`* call getTasks -> " ${projectId}, ${title}`);
  const response = await axios.post<Zantt.ApiResponse<null>>("/task", {
    projectId: projectId,
    title: title
  });
  const data = response.data;
  return data;
}