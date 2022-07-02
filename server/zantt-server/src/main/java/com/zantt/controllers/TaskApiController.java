package com.zantt.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/task")
public class TaskApiController {
    @PostMapping("")
    public ResponseEntity<?> addTask() {
        return ResponseEntity.ok(null);
    }

    @GetMapping("/tasks")
    public ResponseEntity<?> getTasks() {
        return ResponseEntity.ok(null);
    }

    @GetMapping("")
    public ResponseEntity<?> getTask() {
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteTask() {
        return ResponseEntity.ok(null);
    }
}
