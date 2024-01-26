using API.Entities;

namespace API.DTOs
{
    public class DoctorDto : AppUserDto
    {
        public string Specialization { get; set; }
    }
}