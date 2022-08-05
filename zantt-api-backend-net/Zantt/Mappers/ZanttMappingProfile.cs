using AutoMapper;
using Zantt.Entities;
using Zantt.Models.ViewModels;

namespace Zantt.Mappers;

public class ZanttMappingProfile : Profile
{
    public ZanttMappingProfile()
    {
        CreateMap<ProjectEntity, ProjectViewModel>();
        CreateMap<TaskEntity, TaskViewModel>();
        CreateMap<WorkspaceEntity, WorkspaceViewModel>();
    }
}
