using Zantt.Contexts;
using Zantt.Entities;

namespace Zantt.Repositories;

public class ProjectRepository
{
    private readonly ILogger<ProjectRepository> logger;
    private readonly ZanttContext zanttContext;

    public ProjectRepository(
        ILogger<ProjectRepository> logger,
        ZanttContext zanttContext)
    {
        this.logger = logger;
        this.zanttContext = zanttContext;
    }

    public List<ProjectEntity> GetProjects()
    {
        return zanttContext.Projects.ToList();
    }

    public ProjectEntity? GetProjectByProjectId(string projectId)
    {
        return zanttContext.Projects.SingleOrDefault(p => p.ProjectId == projectId);
    }

    public ProjectEntity? AddProject(ProjectEntity project)
    {
        zanttContext.Projects.Add(project);
        zanttContext.SaveChanges();
        return zanttContext.Projects.SingleOrDefault(p => p.ProjectId == project.ProjectId);
    }

    public void DeleteProjectByProjectId(string projectId)
    {
        var project = zanttContext.Projects.SingleOrDefault(p => p.ProjectId == projectId);
        if (project != null)
        {
            zanttContext.Projects.Remove(project);
            zanttContext.SaveChanges();
        }
    }

    public ProjectEntity? UpdateProjectByProjectId(string projectId, string name)
    {
        var project = zanttContext.Projects.SingleOrDefault(p => p.ProjectId == projectId);
        if (project == null)
        {
            return null;
        }

        project.Name = name;
        zanttContext.SaveChanges();
        return zanttContext.Projects.SingleOrDefault(p => p.ProjectId == projectId);
    }
}
