using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Zantt.Entities;

[Table("projects")]
public class ProjectEntity
{
    [Key]
    [Column("project_id")]
    [StringLength(255)]
    public string ProjectId { get; set; } = Guid.NewGuid().ToString();

    [Required]
    [Column("name")]
    [StringLength(255)]
    public string Name { get; set; } = string.Empty;
}
