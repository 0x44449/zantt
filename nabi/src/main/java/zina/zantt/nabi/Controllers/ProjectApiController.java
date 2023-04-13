package zina.zantt.nabi.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zina.zantt.nabi.Models.ProjectEntity;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectApiController {
    @GetMapping("")
    public ResponseEntity<List<ProjectEntity>> getProjects() {
        List<ProjectEntity> projects = new ArrayList<>();

        var project1 = new ProjectEntity();
        project1.setName("Test1");
        project1.setProjectId("123");
        projects.add(project1);

        var project2 = new ProjectEntity();
        project2.setName("Test2");
        project2.setProjectId("456");
        projects.add(project2);

        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectEntity> getProject(@PathVariable("projectId") String projectId) {
        var project = new ProjectEntity();
        project.setName("Test1");
        project.setProjectId(projectId);
        return ResponseEntity.ok(project);
    }

    @PostMapping("")
    public ResponseEntity<ProjectEntity> addProject(@RequestBody ProjectEntity project) {
        return ResponseEntity.ok(project);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<ProjectEntity> removeProject(@PathVariable("projectId") String projectId) {
        var project = new ProjectEntity();
        project.setName("Test1");
        project.setProjectId(projectId);
        return ResponseEntity.ok(project);
    }
}
