using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountController(DataContext context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _context = context;
            
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken!");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => 
                x.UserName == loginDto.Username);

            if (user == null) return Unauthorized("Invalid username!");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password!");
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower()); 
        }

        [HttpPost("registerdoctor")]
        public async Task<ActionResult<DoctorDto>> RegisterDoctor(RegisterDto registerDto)
        {
            if (await DoctorExists(registerDto.Username)) 
                return BadRequest("Username is taken!");

            using var hmac = new HMACSHA512();

            var doctor = new Doctor
            {
                UserName = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return new DoctorDto
            {
                Username = doctor.UserName,
                Token = _tokenService.CreateDoctorToken(doctor)
            };
        }

        [HttpPost("logindoctor")]
        public async Task<ActionResult<DoctorDto>> LoginDoctor(LoginDto loginDto)
        {
            var doctor = await _context.Doctors.SingleOrDefaultAsync(x => 
                x.UserName == loginDto.Username);

            if (doctor == null) 
                return Unauthorized("Invalid username!");

            using var hmac = new HMACSHA512(doctor.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for(int i = 0; i < computedHash.Length; i++)
            {
                if(computedHash[i] != doctor.PasswordHash[i]) 
                    return Unauthorized("Invalid password!");
            }

            return new DoctorDto
            {
                Username = doctor.UserName,
                Token = _tokenService.CreateDoctorToken(doctor)
            };
        }

        private async Task<bool> DoctorExists(string username)
        {
            return await _context.Doctors.AnyAsync(x => x.UserName == username.ToLower()); 
        }
    }
}