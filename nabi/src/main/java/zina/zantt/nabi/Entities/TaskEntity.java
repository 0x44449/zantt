package zina.zantt.nabi.Entities;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity(name = "task")
@IdClass(TaskCompositionId.class)
public class TaskEntity {
    @Id
    @GeneratedValue(generator = "uuid_string")
    @GenericGenerator(name = "uuid_string", strategy = "zina.zantt.nabi.Entities.Generators.UuidStringGenerator")
    @Column(nullable = false, updatable = false)
    private String taskId;
    @Id
    @Column(nullable = false)
    private String projectId;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, length = 3000)
    private String description;
    @Column(nullable = false)
    private LocalDateTime createdDateTime;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(LocalDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }
}
