using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PatientRepository : IPatientRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PatientRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;      
        }
        
        public async Task<Patient> GetPatientByIdAsync(int id)
        {
            return await _context.Patients.FindAsync(id);
        }

        public async Task<Patient> GetPatientByUsernameAsync(string username)
        {
            return await _context.Patients
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<Patient>> GetPatientsAsync()
        {
            return await _context.Patients
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public async Task<IEnumerable<PatientDto>> GetPatientsDTOAsync()
        {
            return await _context.Patients
                .ProjectTo<PatientDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<PatientDto> GetPatientAsync(string username)
        {
            return await _context.Patients
                .Where(x => x.UserName == username)
                .ProjectTo<PatientDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Patient patient)
        {
            _context.Entry(patient).State = EntityState.Modified;
        }
    }
}