package com.zantt.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "timelines")
public class TimelineEntity {
    @Id
    @Column(name = "timeline_id")
    private String timelineId;
    @Column(name = "workspace_id")
    private String workspaceId;
    @Column(name = "task_id")
    private String taskId;
    @Column(name = "project_id")
    private String projectId;
    @Column(name = "timeline_type")
    private String timelineType;

    public String getTimelineId() {
        return timelineId;
    }

    public void setTimelineId(String timelineId) {
        this.timelineId = timelineId;
    }

    public String getWorkspaceId() {
        return workspaceId;
    }

    public void setWorkspaceId(String workspaceId) {
        this.workspaceId = workspaceId;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getTimelineType() {
        return timelineType;
    }

    public void setTimelineType(String timelineType) {
        this.timelineType = timelineType;
    }
}
