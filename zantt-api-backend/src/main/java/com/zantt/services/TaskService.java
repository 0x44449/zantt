package com.zantt.services;

import com.zantt.entities.TaskEntity;
import com.zantt.exceptions.WellKnownApiException;
import com.zantt.repositories.ProjectRepository;
import com.zantt.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TaskService {
    @Autowired
    TaskRepository taskRepository;
    @Autowired
    ProjectRepository projectRepository;

    public List<TaskEntity> getTasksByProjectId(String projectId) {
        var project = projectRepository.findById(projectId);
        if (project.isEmpty()) {
            throw new WellKnownApiException("Can not found project", "PROJECT_NOT_FOUND");
        }

        return taskRepository.findByProjectId(projectId);
    }

    public TaskEntity addTask(String projectId, String title) {
        var project = projectRepository.findById(projectId);
        if (project.isEmpty()) {
            throw new WellKnownApiException("Can not found project", "PROJECT_NOT_FOUND");
        }

        var taskId = UUID.randomUUID().toString();

        var task = new TaskEntity();
        task.setTaskId(taskId);
        task.setProjectId(projectId);
        task.setTitle(title);

        return taskRepository.save(task);
    }

    public void deleteTask(String taskId) {
        taskRepository.deleteById(taskId);
    }
}
