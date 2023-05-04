package zina.zantt.nabi.Entities;

import java.io.Serializable;
import java.util.Objects;

public class CommentCompositionId implements Serializable {
    private final String projectId;
    private final String taskId;
    private final String commentId;

    public CommentCompositionId(String projectId, String taskId, String commentId) {
        this.projectId = projectId;
        this.taskId = taskId;
        this.commentId = commentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommentCompositionId that = (CommentCompositionId) o;
        return Objects.equals(projectId, that.projectId) &&
                Objects.equals(taskId, that.taskId) &&
                Objects.equals(commentId, that.commentId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(projectId, taskId, commentId);
    }
}
