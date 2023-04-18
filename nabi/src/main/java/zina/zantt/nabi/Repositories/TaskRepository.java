package zina.zantt.nabi.Repositories;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import zina.zantt.nabi.Entities.TaskEntity;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<TaskEntity, String> {
    List<TaskEntity> findAllByProjectId(String projectId, Sort sort);
    Optional<TaskEntity> findByProjectIdAndTaskId(String projectId, String taskId);
}
