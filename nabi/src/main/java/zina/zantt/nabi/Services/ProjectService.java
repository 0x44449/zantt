package zina.zantt.nabi.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import zina.zantt.nabi.Entities.ProjectEntity;
import zina.zantt.nabi.Mappers.NabiMapper;
import zina.zantt.nabi.Models.Project;
import zina.zantt.nabi.Repositories.ProjectRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getProjects() {
        var projects = projectRepository.findAll(Sort.by("createdDateTime").descending());
        return NabiMapper.INSTANCE.toProjectDto(projects);
    }

    public Project getProjectByProjectId(String projectId) {
        var project = projectRepository.findById(projectId).orElse(null);
        return NabiMapper.INSTANCE.toProjectDto(project);
    }

    public Project addProject(String name, String description) {
        var project = new ProjectEntity();
        project.setName(name);
        project.setDescription(description);
        project.setCreatedDateTime(LocalDateTime.now());

        var addedProject = projectRepository.save(project);
        return NabiMapper.INSTANCE.toProjectDto(addedProject);
    }

    public void removeProjectByProjectId(String projectId) {
        projectRepository.findById(projectId).ifPresent(projectRepository::delete);
    }
}
