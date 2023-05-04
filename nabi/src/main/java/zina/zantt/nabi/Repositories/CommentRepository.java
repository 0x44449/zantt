package zina.zantt.nabi.Repositories;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import zina.zantt.nabi.Entities.CommentEntity;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<CommentEntity, String> {
    List<CommentEntity> findAllByProjectIdAndTaskId(String projectId, String taskId, Sort sort);
    Optional<CommentEntity> findByProjectIdAndTaskIdAndCommentId(String projectId, String taskId, String commentId);
}
