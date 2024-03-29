using API.Entities;

namespace API.DTOs
{
    public class AppUserDto
    {
        
        public int Id { get; set; }
        public string UserName { get; set; }
        public Role Role {get;set;}
        public int Age { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public List<PhotoDto> Photos { get; set; }
        
    }
}