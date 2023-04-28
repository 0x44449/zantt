import nabiClient from "./nabi-client";
import { MooApiError, ensureApiSuccess } from "./moo-api-error";
import { Nabi } from "@/models/nabi";

export async function getProjects(): Promise<Nabi.Project[]> {
  try {
    const response = await nabiClient.get<Nabi.ApiResult<Nabi.Project[]>>(`/api/v1/projects`);
    const result = response.data;

    return ensureApiSuccess(result);
  }
  catch (e: unknown) {
    throw MooApiError.fromError(e);
  }
}

export async function getProject(projectId: string): Promise<Nabi.Project> {
  try {
    const response = await nabiClient.get<Nabi.ApiResult<Nabi.Project>>(`/api/v1/projects/${projectId}`);
    const result = response.data;

    return ensureApiSuccess(result);
  }
  catch (e: unknown) {
    throw MooApiError.fromError(e);
  }
}

export async function addProject(project: {
  name: string;
  description: string;
}): Promise<Nabi.Project> {
  try {
    const response = await nabiClient.post<Nabi.ApiResult<Nabi.Project>>(`/api/v1/projects`, project);
    const result = response.data;

    return ensureApiSuccess(result);
  }
  catch (e: unknown) {
    throw MooApiError.fromError(e);
  }
}

export async function removeProject(projectId: string): Promise<void> {
  try {
    const response = await nabiClient.delete<Nabi.ApiResult<void>>(`/api/v1/projects/${projectId}`);
    const result = response.data;

    return ensureApiSuccess(result);
  }
  catch (e: unknown) {
    throw MooApiError.fromError(e);
  }
}