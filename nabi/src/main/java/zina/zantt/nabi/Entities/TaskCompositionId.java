package zina.zantt.nabi.Entities;

import java.io.Serializable;
import java.util.Objects;

public class TaskCompositionId implements Serializable {
    private final String projectId;
    private final String taskId;

    public TaskCompositionId(String projectId, String taskId) {
        this.projectId = projectId;
        this.taskId = taskId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaskCompositionId that = (TaskCompositionId) o;
        return Objects.equals(projectId, that.projectId) && Objects.equals(taskId, that.taskId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(projectId, taskId);
    }
}
