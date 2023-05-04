package zina.zantt.nabi.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zina.zantt.nabi.Models.ApiResult;
import zina.zantt.nabi.Models.Comment;
import zina.zantt.nabi.Models.Requests.AddCommentBody;
import zina.zantt.nabi.Services.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentApiController {
    private final CommentService commentService;

    @Autowired
    public CommentApiController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/{projectId}/{taskId}")
    public ResponseEntity<ApiResult<List<Comment>>> getComments(@PathVariable("projectId") String projectId,
                                                                @PathVariable("taskId") String taskId) {
        var comments = commentService.getComments(projectId, taskId);
        return ResponseEntity.ok(new ApiResult<>(true, "Success", comments));
    }

    @GetMapping("/{projectId}/{taskId}/{commentId}")
    public ResponseEntity<ApiResult<Comment>> getComment(@PathVariable("projectId") String projectId,
                                                             @PathVariable("taskId") String taskId,
                                                             @PathVariable("commentId") String commentId) {
        var comment = commentService.getCommentById(projectId, taskId, commentId);
        return ResponseEntity.ok(new ApiResult<>(true, "Success", comment));
    }

    @PostMapping("/{projectId}/{taskId}")
    public ResponseEntity<ApiResult<Comment>> addComment(@PathVariable("projectId") String projectId,
                                                         @PathVariable("taskId") String taskId,
                                                         @RequestBody AddCommentBody body) {
        var content = body.getContent();
        var comment = commentService.addComment(projectId, taskId, content);
        return ResponseEntity.ok(new ApiResult<>(true, "Success", comment));
    }

    @DeleteMapping("/{projectId}/{taskId}/{commentId}")
    public ResponseEntity<ApiResult<Object>> removeComment(@PathVariable("projectId") String projectId,
                                                           @PathVariable("taskId") String taskId,
                                                           @PathVariable("commentId") String commentId) {
        commentService.removeCommentById(projectId, taskId, commentId);
        return ResponseEntity.ok(new ApiResult<>(true, "Success", null));
    }
}
