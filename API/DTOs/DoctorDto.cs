using API.Entities;

namespace API.DTOs
{
    public class DoctorDto : MemberDto
    {
        public string Specialization { get; set; }
    }
}