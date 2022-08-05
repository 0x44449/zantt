using Microsoft.EntityFrameworkCore;
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

    public virtual List<ProjectEntity> GetProjects()
    {
        return zanttContext.Projects
            .AsNoTracking()
            .OrderByDescending(p => p.CreatedTime)
            .ToList();
    }

    public virtual ProjectEntity? GetProjectByProjectId(string projectId)
    {
        return zanttContext.Projects
            .AsNoTracking()
            .SingleOrDefault(p => p.ProjectId == projectId);
    }

    public virtual ProjectEntity? AddProject(string name)
    {
        var project = new ProjectEntity
        {
            Name = name
        };

        zanttContext.Projects.Add(project);
        zanttContext.SaveChanges();

        return zanttContext.Projects
            .AsNoTracking()
            .SingleOrDefault(p => p.ProjectId == project.ProjectId);
    }

    public virtual void DeleteProjectByProjectId(string projectId)
    {
        var project = zanttContext.Projects
            .AsTracking()
            .SingleOrDefault(p => p.ProjectId == projectId);
        if (project != null)
        {
            zanttContext.Projects.Remove(project);
            //zanttContext.Tasks.RemoveRange(
            //    zanttContext.Tasks.Where(t => t.ProjectId == projectId));
            //zanttContext.Workspaces.RemoveRange(
            //    zanttContext.Workspaces.Where(w => w.ProjectId == projectId));

            zanttContext.SaveChanges();
        }
    }

    public virtual ProjectEntity? UpdateProjectByProjectId(string projectId, string name)
    {
        var project = zanttContext.Projects
            .AsTracking()
            .SingleOrDefault(p => p.ProjectId == projectId);
        if (project == null)
        {
            return null;
        }

        project.Name = name;
        zanttContext.SaveChanges();

        return zanttContext.Projects
            .AsNoTracking()
            .SingleOrDefault(p => p.ProjectId == projectId);
    }
}
