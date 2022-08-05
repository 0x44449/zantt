using Microsoft.EntityFrameworkCore;
using Zantt.Contexts;
using Zantt.Entities;

namespace Zantt.Repositories;

public class WorkspaceRepository
{
    private readonly ILogger<WorkspaceRepository> logger;
    private readonly ZanttContext zanttContext;

    public WorkspaceRepository(
        ILogger<WorkspaceRepository> logger,
        ZanttContext zanttContext)
    {
        this.logger = logger;
        this.zanttContext = zanttContext;
    }

    public virtual List<WorkspaceEntity> GetWorkspacesByTaskId(string taskId)
    {
        return zanttContext.Workspaces
            .AsNoTracking()
            .Where(w => w.TaskId == taskId)
            .OrderByDescending(w => w.CreatedTime)
            .ToList();
    }

    public virtual WorkspaceEntity? GetWorkspaceByWorkspaceId(string workspaceId)
    {
        return zanttContext.Workspaces
            .AsNoTracking()
            .SingleOrDefault(w => w.WorkspaceId == workspaceId);
    }

    public virtual WorkspaceEntity? AddWorkspace(string projectId, string taskId, string title, string contents)
    {
        var workspace = new WorkspaceEntity
        {
            ProjectId = projectId,
            TaskId = taskId,
            Title = title,
            Contents = contents
        };

        zanttContext.Workspaces.Add(workspace);
        zanttContext.SaveChanges();

        return zanttContext.Workspaces
            .AsNoTracking()
            .SingleOrDefault(w => w.WorkspaceId == workspace.WorkspaceId);
    }

    public virtual WorkspaceEntity? UpdateWorkspace(
        string workspaceId, string title, string contents)
    {
        var workspace = zanttContext.Workspaces
            .AsTracking()
            .SingleOrDefault(w => w.WorkspaceId == workspaceId);
        if (workspace == null)
        {
            return null;
        }

        workspace.Title = title;
        workspace.Contents = contents;
        zanttContext.SaveChanges();

        return zanttContext.Workspaces
            .AsNoTracking()
            .SingleOrDefault(w => w.WorkspaceId == workspace.WorkspaceId);
    }

    public virtual void DeleteWorkspace(string workspaceId)
    {
        var workspace = zanttContext.Workspaces
            .AsTracking()
            .SingleOrDefault(w => w.WorkspaceId == workspaceId);
        if (workspace != null)
        {
            zanttContext.Workspaces.Remove(workspace);
            zanttContext.SaveChanges();
        }
    }
}
