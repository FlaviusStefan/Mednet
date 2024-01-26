using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public DoctorRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<IEnumerable<Doctor>> GetDoctorsAsync()
        {
            return await _context.Doctors
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public async Task<Doctor> GetDoctorByIdAsync(int id)
        {
            return await _context.Doctors.FindAsync(id);
        }

        public async Task<Doctor> GetDoctorByUsernameAsync(string username)
        {
            return await _context.Doctors
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<DoctorDto>> GetDoctorsDTOAsync()
        {
            return await _context.Doctors
                .ProjectTo<DoctorDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<DoctorDto> GetDoctorAsync(string username)
        {
            return await _context.Doctors
                .Where(x => x.UserName == username)
                .ProjectTo<DoctorDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Doctor doctor)
        {
            _context.Entry(doctor).State = EntityState.Modified;
        }        
    }
}