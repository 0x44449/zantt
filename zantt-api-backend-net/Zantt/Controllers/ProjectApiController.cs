using AutoMapper;
using Microsoft.AspNetCore.Http;
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
        var response = new ApiResponse<IEnumerable<ProjectViewModel>>
        {
            Data = result
        };
        return response;
    }
}
