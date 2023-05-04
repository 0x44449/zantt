package zina.zantt.nabi.Entities;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;

@Entity(name = "comment")
@IdClass(CommentCompositionId.class)
public class CommentEntity {
    @Id
    @GeneratedValue(generator = "uuid_string")
    @GenericGenerator(name = "uuid_string", strategy = "zina.zantt.nabi.Entities.Generators.UuidStringGenerator")
    @Column(nullable = false, updatable = false)
    private String commentId;
    @Id
    @Column(nullable = false)
    private String projectId;
    @Id
    @Column(nullable = false)
    private String taskId;
    @Column(nullable = false)
    private LocalDateTime createdDateTime;
    @Column(nullable = false)
    private String content;

    public String getCommentId() {
        return commentId;
    }

    public void setCommentId(String commentId) {
        this.commentId = commentId;
    }

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

    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(LocalDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
