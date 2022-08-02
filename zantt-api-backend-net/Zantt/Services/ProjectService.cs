using Zantt.Entities;
using Zantt.Exceptions;
using Zantt.Repositories;

namespace Zantt.Services;

public class ProjectService
{
    private readonly ProjectRepository projectRepository;
    private readonly ILogger<ProjectService> logger;

    public ProjectService(
        ILogger<ProjectService> logger,
        ProjectRepository projectRepository)
    {
        this.logger = logger;
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

    public ProjectEntity? UpdateProject(string projectId, string name)
    {
        var project = projectRepository.UpdateProjectByProjectId(projectId, name);
        if (project == null)
        {
            throw new WellKnownApiException("Can not found project", "PROJECT_NOT_FOUND");
        }

        return project;
    }

    public void DeleteProject(string projectId)
    {
        projectRepository.DeleteProjectByProjectId(projectId);
    }
}
