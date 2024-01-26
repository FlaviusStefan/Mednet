using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class PatientsController : BaseApiController
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IMapper _mapper;
        public PatientsController(IPatientRepository patientRepository, IMapper mapper)
        {
            _mapper = mapper;
            _patientRepository = patientRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PatientDto>>> GetPatients()
        {
            var patients = await _patientRepository.GetPatientsDTOAsync();
            
            return Ok(patients);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<PatientDto>> GetDoctor(string username)
        {
            return await _patientRepository.GetPatientAsync(username);
        }
    }
}