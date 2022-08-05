using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Zantt.Entities;
using Zantt.Filters;
using Zantt.Models.RequestModels;
using Zantt.Models.ViewModels;
using Zantt.Services;

namespace Zantt.Controllers;

[ServiceFilter(typeof(ApiExceptionFilterAttribute))]
[Route("workspace")]
[ApiController]
public class WorkspaceApiController : ControllerBase
{
    private readonly ILogger<WorkspaceApiController> logger;
    private readonly WorkspaceService workspaceService;
    private readonly IMapper mapper;

    public WorkspaceApiController(
        ILogger<WorkspaceApiController> logger,
        WorkspaceService workspaceService,
        IMapper mapper)
    {
        this.logger = logger;
        this.workspaceService = workspaceService;
        this.mapper = mapper;
    }

    [HttpGet]
    [Route("workspaces")]
    public ApiResponse<IEnumerable<WorkspaceViewModel>> GetWorkspaces([FromQuery] string taskId)
    {
        var workspaces = workspaceService.GetWorkspaces(taskId);
        var result = mapper.Map<List<WorkspaceEntity>, IEnumerable<WorkspaceViewModel>>(workspaces);
        return new ApiResponse<IEnumerable<WorkspaceViewModel>>
        {
            Data = result
        };
    }

    [HttpGet]
    [Route("")]
    public ApiResponse<WorkspaceViewModel> GetWorkspace([FromQuery] string workspaceId)
    {
        var workspace = workspaceService.GetWorkspace(workspaceId);
        var result = mapper.Map<WorkspaceViewModel>(workspace);
        return new ApiResponse<WorkspaceViewModel>
        {
            Data = result
        };
    }

    [HttpPost]
    [Route("")]
    public ApiResponse<WorkspaceViewModel> AddWorkspace([FromBody] AddWorkspaceRequestModel req)
    {
        var workspace = workspaceService.AddWorkspace(req.ProjectId, req.TaskId, req.Title, req.Contents);
        var result = mapper.Map<WorkspaceViewModel>(workspace);
        return new ApiResponse<WorkspaceViewModel>
        {
            Data = result
        };
    }

    [HttpPut]
    [Route("")]
    public ApiResponse<WorkspaceViewModel> UpdateWorkspace([FromBody] UpdateWorkspaceRequestModel req)
    {
        var workspace = workspaceService.UpdateWorkspace(req.WorkspaceId, req.Title, req.Contents);
        var result = mapper.Map<WorkspaceViewModel>(workspace);
        return new ApiResponse<WorkspaceViewModel>
        {
            Data = result
        };
    }

    [HttpDelete]
    [Route("")]
    public ApiResponse Deleteworkspace([FromQuery] string workspaceId)
    {
        workspaceService.DeleteWorkspace(workspaceId);
        return new ApiResponse();
    }
}
