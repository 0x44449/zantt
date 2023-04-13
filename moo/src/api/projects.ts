import axiosClient from "./axios-client";

export async function getProjects() {
  const response = await axiosClient.get(`/projects`);
  return response.data;
}

export async function getProject(projectId: string) {
  const response = await axiosClient.get(`/projects/${projectId}`);
  return response.data;
}

export async function addProject(project: {
  name: string;
}) {
  const response = await axiosClient.post(`/projects`, project);
  return response.data;
}

export async function removeProject(projectId: string) {
  const response = await axiosClient.delete(`/projects/${projectId}`);
  return response.data;
}