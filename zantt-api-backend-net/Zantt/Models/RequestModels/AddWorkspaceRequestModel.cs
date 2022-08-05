namespace Zantt.Models.RequestModels;

public class AddWorkspaceRequestModel
{
    public string? ProjectId { get; set; }

    public string? TaskId { get; set; }

    public string? Title { get; set; }

    public string? Contents { get; set; }
}
