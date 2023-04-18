package zina.zantt.nabi.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zina.zantt.nabi.Models.Project;
import zina.zantt.nabi.Models.Requests.AddProjectBody;
import zina.zantt.nabi.Models.ApiResult;
import zina.zantt.nabi.Services.ProjectService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectApiController {
    private final ProjectService projectService;

    @Autowired
    public ProjectApiController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("")
    public ResponseEntity<ApiResult<List<Project>>> getProjects() {
        var projects = projectService.getProjects();
        return ResponseEntity.ok(new ApiResult<>(true, "Success", projects));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ApiResult<Project>> getProject(@PathVariable("projectId") String projectId) {
        var project = projectService.getProjectByProjectId(projectId);
        return ResponseEntity.ok(new ApiResult<>(true, "Success", project));
    }

    @PostMapping("")
    public ResponseEntity<ApiResult<Project>> addProject(@RequestBody AddProjectBody body) {
        var name = body.getName();
        var description = body.getDescription();
        var addedProject = projectService.addProject(name, description);
        return ResponseEntity.ok(new ApiResult<>(true, "Success", addedProject));
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<ApiResult<Object>> removeProject(@PathVariable("projectId") String projectId) {
        projectService.removeProjectByProjectId(projectId);
        return ResponseEntity.ok(new ApiResult<>(true, "Success", null));
    }
}
