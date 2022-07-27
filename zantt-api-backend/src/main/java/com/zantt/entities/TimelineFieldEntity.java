package com.zantt.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "timeline_fields")
public class TimelineFieldEntity {
    @Id
    @Column(name = "timeline_field_id")
    private String timelineFieldId;
    @Column(name = "timeline_id")
    private String timelineId;
    @Column(name = "workspace_id")
    private String workspaceId;
    @Column(name = "task_id")
    private String taskId;
    @Column(name = "project_id")
    private String projectId;
    @Column(name = "field_key")
    private String fieldKey;
    @Column(name = "field_value")
    private String fieldValue;

    public String getTimelineFieldId() {
        return timelineFieldId;
    }

    public void setTimelineFieldId(String timelineFieldId) {
        this.timelineFieldId = timelineFieldId;
    }

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

    public String getFieldKey() {
        return fieldKey;
    }

    public void setFieldKey(String fieldKey) {
        this.fieldKey = fieldKey;
    }

    public String getFieldValue() {
        return fieldValue;
    }

    public void setFieldValue(String fieldValue) {
        this.fieldValue = fieldValue;
    }
}
