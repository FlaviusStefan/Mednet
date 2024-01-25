using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class DoctorsController : BaseApiController
    {
        private readonly IDoctorRepository _doctorRepository;
        private readonly IMapper _mapper;
        
        public DoctorsController(IDoctorRepository doctorRepository, IMapper mapper)
        {
            _mapper = mapper;
            _doctorRepository = doctorRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorDto>>> GetDoctors()
        {
            var doctors = await _doctorRepository.GetDoctorsDTOAsync();

            return Ok(doctors);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<DoctorDto>> GetDoctor(string username)
        {
            return await _doctorRepository.GetDoctorAsync(username);       
        }
    }
}