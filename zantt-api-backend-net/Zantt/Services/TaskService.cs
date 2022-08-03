using Zantt.Entities;
using Zantt.Repositories;

namespace Zantt.Services;

public class TaskService
{
    private readonly ProjectRepository projectRepository;
    private readonly TaskRepository taskRepository;
    private readonly ILogger<TaskService> logger;

    public TaskService(
        ILogger<TaskService> logger,
        ProjectRepository projectRepository,
        TaskRepository taskRepository)
    {
        this.logger = logger;
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    public List<TaskEntity> GetTasks(string projectId)
    {
        return taskRepository.GetTasksByProjectId(projectId);
    }
}
