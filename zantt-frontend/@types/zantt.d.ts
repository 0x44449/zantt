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
  type WorkspaceModelType = {
    workspaceId: string,
    taskId: string,
    projectId: string,
    contents: string,
  }
  type TimelineModelType = {
    timelineId: string,
    workspaceId: string,
    taskId: string,
    projectId: string,
    timelineType: string,
    fields: TimelineFieldModelType[],
  }
  type TimelineFieldModelType = {
    fieldType: string,
    fieldKey: string,
    fieldValue: string,
  }
}