package zina.zantt.nabi.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import zina.zantt.nabi.Entities.CommentEntity;
import zina.zantt.nabi.Mappers.NabiMapper;
import zina.zantt.nabi.Models.Comment;
import zina.zantt.nabi.Repositories.CommentRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getComments(String projectId, String taskId) {
        var comments = commentRepository.findAllByProjectIdAndTaskId(
                projectId,
                taskId,
                Sort.by(Sort.Direction.DESC, "createdDateTime").descending()
        );
        return NabiMapper.INSTANCE.toCommentDto(comments);
    }

    public Comment getCommentById(String projectId, String taskId, String commentId) {
        var comment = commentRepository.findByProjectIdAndTaskIdAndCommentId(projectId, taskId, commentId).orElse(null);
        return NabiMapper.INSTANCE.toCommentDto(comment);
    }

    public Comment addComment(String projectId, String taskId, String content) {
        var comment = new CommentEntity();
        comment.setProjectId(projectId);
        comment.setTaskId(taskId);
        comment.setContent(content);
        comment.setCreatedDateTime(LocalDateTime.now());

        var addedComment = commentRepository.save(comment);
        return NabiMapper.INSTANCE.toCommentDto(addedComment);
    }

    public void removeCommentById(String projectId, String taskId, String commentId) {
        commentRepository.findByProjectIdAndTaskIdAndCommentId(projectId, taskId, commentId)
                .ifPresent(commentRepository::delete);
    }
}
