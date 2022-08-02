using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Zantt.Entities;
using Zantt.Filters;
using Zantt.Models;
using Zantt.Services;

namespace Zantt.Controllers;

[ApiExceptionFilter]
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
        var project = projectService.AddProject(req.Name);
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
