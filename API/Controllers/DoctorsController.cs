using API.DTOs;
using API.Entities;
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
            var doctors = await _doctorRepository.GetDoctorsAsync();

            var doctorsToReturn = _mapper.Map<IEnumerable<DoctorDto>>(doctors);

            return Ok(doctorsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DoctorDto>> GetDoctor(string username)
        {
            var doctor = await _doctorRepository.GetDoctorByUsernameAsync(username);

            return _mapper.Map<DoctorDto>(doctor);
        }
    }
}