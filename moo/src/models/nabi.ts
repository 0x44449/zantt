export namespace Nabi {
  export interface ApiResult<T> {
    success: boolean;
    message: string;
    data: T;
  }

  export interface Project {
    projectId: string;
    name: string;
    description: string;
    createdDate: string;
  }

  export interface Task {
    projectId: string;
    taskId: string;
    name: string;
    description: string;
    createdDate: string;
  }
}