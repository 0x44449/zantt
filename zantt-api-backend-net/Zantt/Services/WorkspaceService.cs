using Zantt.Entities;
using Zantt.Repositories;

namespace Zantt.Services;

public class WorkspaceService
{
    private readonly WorkspaceRepository workspaceRepository;
    private readonly ILogger<WorkspaceService> logger;

    public WorkspaceService(
        ILogger<WorkspaceService> logger,
        WorkspaceRepository workspaceRepository)
    {
        this.logger = logger;
        this.workspaceRepository = workspaceRepository;
    }

    public List<WorkspaceEntity> GetWorkspaces(string taskId)
    {
        return workspaceRepository.GetWorkspacesByTaskId(taskId);
    }

    public WorkspaceEntity? GetWorkspace(string workspaceId)
    {
        return workspaceRepository.GetWorkspaceByWorkspaceId(workspaceId);
    }

    public WorkspaceEntity? AddWorkspace(string projectId, string taskId, string title, string contents)
    {
        return workspaceRepository.AddWorkspace(projectId, taskId, title, contents);
    }

    public WorkspaceEntity? UpdateWorkspace(string workspaceId, string title, string contents)
    {
        return workspaceRepository.UpdateWorkspace(workspaceId, title, contents);
    }

    public void DeleteWorkspace(string workspaceId)
    {
        workspaceRepository.DeleteWorkspace(workspaceId);
    }
}
