using Zantt.Contexts;
using Zantt.Entities;

namespace Zantt.Repositories;

public class TaskRepository
{
    private readonly ILogger<ProjectRepository> logger;
    private readonly ZanttContext zanttContext;

    public TaskRepository(
        ILogger<ProjectRepository> logger,
        ZanttContext zanttContext)
    {
        this.logger = logger;
        this.zanttContext = zanttContext;
    }

    public virtual List<TaskEntity> GetTasksByProjectId(string projectId)
    {
        return zanttContext.Tasks
            .Where(t => t.ProjectId == projectId)
            .OrderByDescending(t => t.CreatedTime)
            .ToList();
    }

    public virtual TaskEntity? GetTaskByTaskId(string taskId)
    {
        return zanttContext.Tasks
            .SingleOrDefault(t => t.TaskId == taskId);
    }

    public virtual TaskEntity? AddTask(TaskEntity task)
    {
        zanttContext.Tasks.Add(task);
        zanttContext.SaveChanges();

        return zanttContext.Tasks
            .SingleOrDefault(t => t.TaskId == task.TaskId);
    }

    public virtual void DeleteTaskByTaskId(string taskId)
    {
        var task = zanttContext.Tasks
            .SingleOrDefault(t => t.TaskId == taskId);
        if (task != null)
        {
            zanttContext.Tasks.Remove(task);
            zanttContext.SaveChanges();
        }
    }

    public virtual TaskEntity? UpdateTaskByTaskId(string taskId, string title)
    {
        var task = zanttContext.Tasks
            .SingleOrDefault(t => t.TaskId == taskId);
        if (task == null)
        {
            return null;
        }

        task.Title = title;
        zanttContext.SaveChanges();

        return zanttContext.Tasks
            .SingleOrDefault(t => t.TaskId == taskId);
    }
}
