export as namespace Zantt;
declare namespace Zantt {
  type SuspenderActionType<T = any> = {
    fetch: () => T
  }

  type ApiResponse<T = any> = {
    success: boolean;
    errorMessage: string;
    errorCode: string;
    data: T;
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
  type WorkspaceModelType = {
    workspaceId: string,
    taskId: string,
    projectId: string,
    title: string,
    contents: string,
  }
  type TimelineModelType = {
    timelineId: string,
    workspaceId: string,
    taskId: string,
    projectId: string,
    timelineType: string,
  }
  type TimelineFieldModelType = {
    fieldType: string,
    fieldKey: string,
    fieldValue: string,
  }
}

declare module 'daisyui'; // daisyui fix