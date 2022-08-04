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
        return zanttContext.work
    }
}
