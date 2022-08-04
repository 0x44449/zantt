using System.Diagnostics;
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
        if (projectId == null)
        {
            throw new WellKnownApiException($"{nameof(projectId)} is null", "INVALID_PARAMETER");
        }

        return projectRepository.GetProjectByProjectId(projectId);
    }

    public ProjectEntity AddProject(string name)
    {
        if (name == null)
        {
            throw new WellKnownApiException($"{nameof(name)} is null", "INVALID_PARAMETER");
        }

        var project = new ProjectEntity()
        {
            ProjectId = Guid.NewGuid().ToString(),
            Name = name,
            CreatedTime = DateTime.Now
        };

        var addedProject = projectRepository.AddProject(project);
        if (addedProject == null)
        {
            throw new WellKnownApiException("Failed to project add", "FAILED_TO_PROJECT_ADD");
        }

        return addedProject;
    }

    public ProjectEntity UpdateProject(string projectId, string name)
    {
        if (projectId == null)
        {
            throw new WellKnownApiException($"{nameof(projectId)} is null", "INVALID_PARAMETER");
        }
        if (name == null)
        {
            throw new WellKnownApiException($"{nameof(name)} is null", "INVALID_PARAMETER");
        }

        var updatedProject = projectRepository.UpdateProjectByProjectId(projectId, name);
        if (updatedProject == null)
        {
            throw new WellKnownApiException("Project not found", "PROJECT_NOT_FOUND");
        }

        return updatedProject;
    }

    public void DeleteProject(string projectId)
    {
        if (projectId == null)
        {
            throw new WellKnownApiException($"{nameof(projectId)} is null", "INVALID_PARAM");
        }

        projectRepository.DeleteProjectByProjectId(projectId);
    }
}
