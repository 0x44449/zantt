package com.zantt.services;

import com.zantt.entities.ProjectEntity;
import com.zantt.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {
    @Autowired
    ProjectRepository projectRepository;

    public List<ProjectEntity> getProjects() {
        return projectRepository.findAll();
    }

    public ProjectEntity getProject(String projectId) {
        var project = projectRepository.findById(projectId);
        if (project.isEmpty()) {
            return null;
        }
        return project.get();
    }

    public ProjectEntity addProject(String name) {
        var projectId = UUID.randomUUID().toString();

        var project = new ProjectEntity();
        project.setProjectId(projectId);
        project.setName(name);

        return projectRepository.save(project);
    }

    public void deleteProject(String projectId) {
        projectRepository.deleteById(projectId);
    }
}
