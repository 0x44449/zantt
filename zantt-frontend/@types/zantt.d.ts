export as namespace Zantt;
declare namespace Zantt {
  type SuspenderActionType<T = any> = {
    fetch: () => T
  }

  type ApiResponse<T = any> = {
    success: boolean,
    data: T
  }

  type ProjectModelType = {
    projectId: string,
    name: string
  }
  type TaskModelType = {
    taskId: string,
    projectId: string,
    title: string
  }
}