using Microsoft.EntityFrameworkCore;
using Zantt.Entities;

namespace Zantt.Contexts;

public class ZanttContext : DbContext
{
    public ZanttContext(DbContextOptions<ZanttContext> options) : base(options) { }

    public DbSet<ProjectEntity> Projects { get; set; }
}
