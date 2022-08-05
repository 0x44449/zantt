namespace Zantt.Models.RequestModels;

public class UpdateWorkspaceRequestModel
{
    public string? WorkspaceId { get; set; }

    public string? Title { get; set; }

    public string? Contents { get; set; }
}
