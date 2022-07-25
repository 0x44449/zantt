package com.zantt.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/project")
public class ProjectApiController {
    @PostMapping("/project")
    public ResponseEntity<?> addProject() {
        return ResponseEntity.ok(null);
    }

    @GetMapping("/projects")
    public ResponseEntity<String> getProjects() {
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/project")
    public ResponseEntity<?> getProject() {
        return ResponseEntity.ok("");
    }

    @DeleteMapping("/project")
    public ResponseEntity<?> deleteProject() {
        return ResponseEntity.ok("");
    }
}
