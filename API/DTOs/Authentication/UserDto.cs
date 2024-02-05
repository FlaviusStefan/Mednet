using API.Entities;

namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Token { get; set; }    
        public Role Role { get; set; }
    }
}