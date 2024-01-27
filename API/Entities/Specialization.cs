using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Specializations")]
    public class Specialization
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Doctor Doctor { get; set; }
    }
}