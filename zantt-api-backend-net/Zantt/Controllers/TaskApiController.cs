using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Zantt.Entities;
using Zantt.Filters;
using Zantt.Models.RequestModels;
using Zantt.Models.ViewModels;
using Zantt.Services;

namespace Zantt.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilterAttribute))]
    [Route("task")]
    [ApiController]
    public class TaskApiController : ControllerBase
    {
        private readonly ILogger<TaskApiController> logger;
        private readonly TaskService taskService;
        private readonly IMapper mapper;

        public TaskApiController(
            ILogger<TaskApiController> logger,
            TaskService taskService,
            IMapper mapper)
        {
            this.logger = logger;
            this.taskService = taskService;
            this.mapper = mapper;
        }

        [HttpGet]
        [Route("tasks")]
        public ApiResponse<IEnumerable<TaskViewModel>> GetTasks([FromQuery] string projectId)
        {
            var tasks = taskService.GetTasks(projectId);
            var result = mapper.Map<List<TaskEntity>, IEnumerable<TaskViewModel>>(tasks);
            return new ApiResponse<IEnumerable<TaskViewModel>>
            {
                Data = result
            };
        }

        [HttpPost]
        [Route("")]
        public ApiResponse<TaskViewModel> AddTask([FromBody] AddTaskRequestModel req)
        {
            var task = taskService.AddTask(req.ProjectId, req.Title);
            var result = mapper.Map<TaskViewModel>(task);
            return new ApiResponse<TaskViewModel>
            {
                Data = result
            };
        }

        [HttpPut]
        [Route("")]
        public ApiResponse<TaskViewModel> UpdateTask([FromBody] UpdateTaskRequestModel req)
        {
            var task = taskService.UpdateTask(req.TaskId, req.Title);
            var result = mapper.Map<TaskViewModel>(task);
            return new ApiResponse<TaskViewModel>
            {
                Data = result
            };
        }

        [HttpDelete]
        [Route("")]
        public ApiResponse DeleteTask([FromQuery] string taskId)
        {
            taskService.DeleteTask(taskId);
            return new ApiResponse();
        }
    }
}
