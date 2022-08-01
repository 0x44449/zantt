using Zantt.Contexts;
using Zantt.Entities;

namespace Zantt.Repositories;

public class ProjectRepository
{
    private readonly ZanttContext zanttContext;

    public ProjectRepository(ZanttContext zanttContext)
    {
        this.zanttContext = zanttContext;
    }

    public List<ProjectEntity> GetProjects()
    {
        return zanttContext.Projects.ToList();
    }
}
