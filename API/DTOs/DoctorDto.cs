using API.Entities;

namespace API.DTOs
{
    public class DoctorDto : MemberDto
    {
        public Specialization Specialization { get; set; }
    }
}