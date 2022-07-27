package com.zantt.controllers;

import com.zantt.mappers.ProjectMapper;
import com.zantt.models.AddProjectReqModel;
import com.zantt.models.ApiResponse;
import com.zantt.models.ProjectViewModel;
import com.zantt.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/project")
public class ProjectApiController {
    @Autowired
    ProjectService projectService;

    @PostMapping("")
    public ResponseEntity<ApiResponse<ProjectViewModel>> addProject(@RequestBody AddProjectReqModel req) {
        var project = projectService.addProject(req.getName());
        var result = ProjectMapper.Instance.toViewModel(project);
        var response = new ApiResponse<>(result);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/projects")
    public ResponseEntity<ApiResponse<List<ProjectViewModel>>> getProjects() {
        var projects = projectService.getProjects();
        var result = ProjectMapper.Instance.toViewModels(projects);
        var response = new ApiResponse<>(result);
        return ResponseEntity.ok(response);
    }

    @GetMapping("")
    public ResponseEntity<ApiResponse<ProjectViewModel>> getProject(@RequestParam("projectId") String projectId) {
        var project = projectService.getProject(projectId);
        var result = ProjectMapper.Instance.toViewModel(project);
        var response = new ApiResponse<>(result);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("")
    public ResponseEntity<ApiResponse<Object>> deleteProject(@RequestParam("projectId") String projectId) {
        projectService.deleteProject(projectId);
        var response = new ApiResponse<>(null);
        return ResponseEntity.ok(response);
    }
}
