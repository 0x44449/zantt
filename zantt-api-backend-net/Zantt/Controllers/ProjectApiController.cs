using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Zantt.Entities;
using Zantt.Exceptions;
using Zantt.Filters;
using Zantt.Models.RequestModels;
using Zantt.Models.ViewModels;
using Zantt.Services;

namespace Zantt.Controllers;

[ServiceFilter(typeof(ApiExceptionFilterAttribute))]
[Route("project")]
[ApiController]
public class ProjectApiController : ControllerBase
{
    private readonly ILogger<ProjectApiController> logger;
    private readonly ProjectService projectService;
    private readonly IMapper mapper;

    public ProjectApiController(
        ILogger<ProjectApiController> logger,
        ProjectService projectService,
        IMapper mapper)
    {
        this.logger = logger;
        this.projectService = projectService;
        this.mapper = mapper;
    }

    [HttpGet]
    [Route("projects")]
    public ApiResponse<IEnumerable<ProjectViewModel>> GetProjects()
    {
        var projects = projectService.GetProjects();
        var result = mapper.Map<List<ProjectEntity>, IEnumerable<ProjectViewModel>>(projects);
        return new ApiResponse<IEnumerable<ProjectViewModel>>
        {
            Data = result
        };
    }

    [HttpGet]
    [Route("")]
    public ApiResponse<ProjectViewModel> GetProject([FromQuery] string projectId)
    {
        var project = projectService.GetProject(projectId);
        var result = mapper.Map<ProjectViewModel>(project);
        return new ApiResponse<ProjectViewModel>
        {
            Data = result
        };
    }

    [HttpPost]
    [Route("")]
    public ApiResponse<ProjectViewModel> AddProject([FromBody] AddProjectRequestModel req)
    {
        if (req.Name == null)
        {
            throw new WellKnownApiException("Name field is null", "INVALID_PARAMETER");
        }

        var project = projectService.AddProject(req.Name);
        var result = mapper.Map<ProjectViewModel>(project);
        return new ApiResponse<ProjectViewModel>
        {
            Data = result
        };
    }

    [HttpPut]
    [Route("")]
    public ApiResponse<ProjectViewModel> UpdateProject([FromBody] UpdateProjectRequestModel req)
    {
        if (req.ProjectId == null)
        {
            throw new WellKnownApiException("ProjectId field is null", "INVALID_PARAMETER");
        }
        if (req.Name == null)
        {
            throw new WellKnownApiException("Name field is null", "INVALID_PARAMETER");
        }

        var project = projectService.UpdateProject(req.ProjectId, req.Name);
        var result = mapper.Map<ProjectViewModel>(project);
        return new ApiResponse<ProjectViewModel>
        {
            Data = result
        };
    }

    [HttpDelete]
    [Route("")]
    public ApiResponse DeleteProject([FromQuery] string projectId)
    {
        projectService.DeleteProject(projectId);
        return new ApiResponse();
    }
}
