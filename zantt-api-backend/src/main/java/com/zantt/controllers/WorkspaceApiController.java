package com.zantt.controllers;

import com.zantt.mappers.WorkspaceMapper;
import com.zantt.models.AddWorkspaceReqModel;
import com.zantt.models.ApiResponse;
import com.zantt.models.WorkspaceViewModel;
import com.zantt.services.WorkspaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workspace")
@CrossOrigin("*")
public class WorkspaceApiController {
    @Autowired
    WorkspaceService workspaceService;

    @GetMapping("/workspaces")
    public ResponseEntity<ApiResponse<List<WorkspaceViewModel>>> getWorkspacesByTaskId(
            @RequestParam("taskId") String taskId) {
        var workspaces = workspaceService.getWorkspacesByTaskId(taskId);
        var result = WorkspaceMapper.Instance.toViewModels(workspaces);
        var response = new ApiResponse<>(result);
        return ResponseEntity.ok(response);
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse<WorkspaceViewModel>> addWorkspace(@RequestBody AddWorkspaceReqModel req) {
        var workspace = workspaceService.addWorkspace(
                req.getTaskId(), req.getTitle(), req.getContents());
        var result = WorkspaceMapper.Instance.toViewModel(workspace);
        var response = new ApiResponse<>(result);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("")
    public ResponseEntity<ApiResponse<Object>> deleteWorkspace(@RequestParam("workspaceId") String workspaceId) {
        workspaceService.deleteWorkspace(workspaceId);
        var response = new ApiResponse<>(null);
        return ResponseEntity.ok(response);
    }
}
