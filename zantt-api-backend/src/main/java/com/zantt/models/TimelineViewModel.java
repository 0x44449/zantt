package com.zantt.models;

public class TimelineViewModel {
    private String projectId;
    private String taskId;
    private String workspaceId;
    private String timelineId;
    private String timelineType;

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getWorkspaceId() {
        return workspaceId;
    }

    public void setWorkspaceId(String workspaceId) {
        this.workspaceId = workspaceId;
    }

    public String getTimelineId() {
        return timelineId;
    }

    public void setTimelineId(String timelineId) {
        this.timelineId = timelineId;
    }

    public String getTimelineType() {
        return timelineType;
    }

    public void setTimelineType(String timelineType) {
        this.timelineType = timelineType;
    }
}
