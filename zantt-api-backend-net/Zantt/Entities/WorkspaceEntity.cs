using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zantt.Entities;

[Table("workspaces")]
public class WorkspaceEntity
{
    [Required]
    [Column("project_id")]
    [StringLength(255)]
    public string ProjectId { get; set; } = Guid.NewGuid().ToString();

    [Required]
    [Column("task_id")]
    [StringLength(255)]
    public string TaskId { get; set; } = Guid.NewGuid().ToString();

    [Key]
    [Column("workspace_id")]
    [StringLength(255)]
    public string WorkspaceId { get; set; } = Guid.NewGuid().ToString();

    [Required]
    [Column("title")]
    [StringLength(255)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [Column("contents")]
    [StringLength(2000)]
    public string Contents { get; set; } = string.Empty;

    [Required]
    [Column("created_time")]
    public DateTime CreatedTime { get; set; } = DateTime.Now;
}
