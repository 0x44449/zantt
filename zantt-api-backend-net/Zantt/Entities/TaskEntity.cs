using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zantt.Entities;

[Table("tasks")]
public class TaskEntity
{
    [Required]
    [Column("project_id")]
    [StringLength(255)]
    public string ProjectId { get; set; } = Guid.NewGuid().ToString();

    [Key]
    [Column("task_id")]
    [StringLength(255)]
    public string TaskId { get; set; } = Guid.NewGuid().ToString();

    [Required]
    [Column("title")]
    [StringLength(255)]
    public string Title { get; set; } = "";

    [Required]
    [Column("created_time")]
    public DateTime CreatedTime { get; set; } = DateTime.Now;
}
