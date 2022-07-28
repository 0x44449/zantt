package com.zantt.controllers;

import com.zantt.mappers.TaskMapper;
import com.zantt.models.AddTaskReqModel;
import com.zantt.models.ApiResponse;
import com.zantt.models.TaskViewModel;
import com.zantt.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
@CrossOrigin("*")
public class TaskApiController {
    @Autowired
    TaskService taskService;

    @PostMapping("")
    public ResponseEntity<ApiResponse<TaskViewModel>> addTask(@RequestBody AddTaskReqModel req) {
        var task = taskService.addTask(req.getProjectId(), req.getTitle());
        var result = TaskMapper.Instance.toViewModel(task);
        var response = new ApiResponse<>(result);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/tasks")
    public ResponseEntity<ApiResponse<List<TaskViewModel>>> getTasksByProjectId(@RequestParam("projectId") String projectId) {
        var tasks = taskService .getTasksByProjectId(projectId);
        var result = TaskMapper.Instance.toViewModels(tasks);
        var response = new ApiResponse<>(result);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("")
    public ResponseEntity<ApiResponse<Object>> deleteTask(@RequestParam("taskId") String taskId) {
        taskService.deleteTask(taskId);
        var response = new ApiResponse<>(null);
        return ResponseEntity.ok(response);
    }
}
