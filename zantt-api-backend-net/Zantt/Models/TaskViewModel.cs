namespace Zantt.Models;

public class TaskViewModel
{
    public string ProjectId { get; set; } = string.Empty;

    public string TaskId { get; set; } = string.Empty;

    public string Title { get; set; } = string.Empty;

    public DateTime CreatedTime { get; set; }
}
