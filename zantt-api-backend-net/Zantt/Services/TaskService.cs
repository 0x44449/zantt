using Zantt.Entities;
using Zantt.Exceptions;
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

    public TaskEntity? GetTask(string taskId)
    {
        return taskRepository.GetTaskByTaskId(taskId);
    }

    public TaskEntity? AddTask(string projectId, string title)
    {
        if (projectId == null)
        {
            throw new WellKnownApiException($"{nameof(projectId)} is null", "INVALID_PARAMETER");
        }
        if (title == null)
        {
            throw new WellKnownApiException($"{nameof(title)} is null", "INVALID_PARAMETER");
        }

        var project = projectRepository.GetProjectByProjectId(projectId);
        if (project == null)
        {
            throw new WellKnownApiException("Project not found", "PROJECT_NOT_FOUND");
        }

        var task = new TaskEntity()
        {
            ProjectId = projectId,
            TaskId = Guid.NewGuid().ToString(),
            Title = title,
            CreatedTime = DateTime.Now
        };

        return taskRepository.AddTask(task);
    }

    public TaskEntity? UpdateTask(string taskId, string title)
    {
        if (taskId == null)
        {
            throw new WellKnownApiException($"{nameof(taskId)} is null", "INVALID_PARAMETER");
        }
        if (title == null)
        {
            throw new WellKnownApiException($"{nameof(title)} is null", "INVALID_PARAMETER");
        }

        return taskRepository.UpdateTaskByTaskId(taskId, title);
    }
}
