using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("PhotosDoctor")]
    public class PhotoDoctor
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; }
    }
}