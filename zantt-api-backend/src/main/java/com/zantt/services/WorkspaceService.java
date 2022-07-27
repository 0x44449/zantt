package com.zantt.services;

import com.zantt.entities.WorkspaceEntity;
import com.zantt.exceptions.WellKnownApiException;
import com.zantt.repositories.ProjectRepository;
import com.zantt.repositories.TaskRepository;
import com.zantt.repositories.WorkspaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class WorkspaceService {
    @Autowired
    WorkspaceRepository workspaceRepository;
    @Autowired
    TaskRepository taskRepository;

    public WorkspaceEntity getWorkspaceByTaskId(String taskId) {
        var task = taskRepository.findById(taskId);
        if (task.isEmpty()) {
            throw new WellKnownApiException("Can not found task", "TASK_NOT_FOUND");
        }

        var workspace = workspaceRepository.findOptionalByTaskId(taskId);
        if (workspace.isEmpty()) {
            return null;
        }
        return workspace.get();
    }

    public WorkspaceEntity addWorkspace(String taskId, String contents) {
        var task = taskRepository.findById(taskId);
        if (task.isEmpty()) {
            throw new WellKnownApiException("Can not found task", "TASK_NOT_FOUND");
        }

        var workspaceId = UUID.randomUUID().toString();

        var workspace = new WorkspaceEntity();
        workspace.setWorkspaceId(workspaceId);
        workspace.setProjectId(task.get().getProjectId());
        workspace.setTaskId(taskId);
        workspace.setContents(contents);

        return workspaceRepository.save(workspace);
    }
}
