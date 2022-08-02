using Zantt.Entities;
using Zantt.Repositories;

namespace Zantt.Services;

public class ProjectService
{
    private readonly ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository)
    {
        this.projectRepository = projectRepository;
    }

    public List<ProjectEntity> GetProjects()
    {
        return projectRepository.GetProjects();
    }

    public ProjectEntity? GetProject(string projectId)
    {
        return projectRepository.GetProjectByProjectId(projectId);
    }

    public ProjectEntity? AddProject(string name)
    {
        var projectId = Guid.NewGuid().ToString();

        var project = new ProjectEntity()
        {
            ProjectId = projectId,
            Name = name
        };

        return projectRepository.AddProject(project);
    }

    public void DeleteProject(string projectId)
    {
        projectRepository.DeleteProjectByProjectId(projectId);
    }
}
