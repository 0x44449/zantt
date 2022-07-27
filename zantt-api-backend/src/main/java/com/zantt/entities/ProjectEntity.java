package com.zantt.entities;

import javax.persistence.*;

@Entity
@Table(name = "projects")
public class ProjectEntity {
    @Id
    @Column(name = "project_id")
    private String projectId;
    @Column(name = "name", nullable = false)
    private String name;

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
