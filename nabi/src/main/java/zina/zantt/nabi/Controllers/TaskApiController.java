package zina.zantt.nabi.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zina.zantt.nabi.Models.ApiResult;
import zina.zantt.nabi.Models.Requests.AddTaskBody;
import zina.zantt.nabi.Models.Task;
import zina.zantt.nabi.Services.TaskService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
public class TaskApiController {
    private final TaskService taskService;

    @Autowired
    public TaskApiController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResult<List<Task>>> getTasks(@PathVariable("projectId") String projectId) {
        var tasks = taskService.getTasks(projectId);
        return ResponseEntity.ok(new ApiResult<>(true, "Success", tasks));
    }

    @GetMapping("/{projectId}/{taskId}")
    public ResponseEntity<ApiResult<Task>> getTask(@PathVariable("projectId") String projectId,
                                                       @PathVariable("taskId") String taskId) {
        var task = taskService.getTaskById(projectId, taskId);
        return ResponseEntity.ok(new ApiResult<>(true, "Success", task));
    }

    @PostMapping("/{projectId}")
    public ResponseEntity<ApiResult<Task>> addTask(@PathVariable("projectId") String projectId,
                                                   @RequestBody AddTaskBody body) {
        var name = body.getName();
        var description = body.getDescription();
        var task = taskService.addTask(projectId, name, description);
        return ResponseEntity.ok(new ApiResult<>(true, "Success", task));
    }

    @DeleteMapping("/{projectId}/{taskId}")
    public ResponseEntity<ApiResult<Object>> removeTask(@PathVariable("projectId") String projectId,
                                                        @PathVariable("taskId") String taskId) {
        taskService.removeTaskById(projectId, taskId);
        return ResponseEntity.ok(new ApiResult<>(true, "Success", null));
    }
}
