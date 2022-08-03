using AutoMapper;
using Zantt.Entities;
using Zantt.Models;

namespace Zantt.Mappers;

public class ZanttMappingProfile : Profile
{
    public ZanttMappingProfile()
    {
        CreateMap<ProjectEntity, ProjectViewModel>();
        CreateMap<TaskEntity, TaskViewModel>();
    }
}
