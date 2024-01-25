using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IDoctorRepository
    {
        Task<IEnumerable<Doctor>> GetDoctorsAsync();
        Task<Doctor> GetDoctorByIdAsync(int id);
        Task<Doctor> GetDoctorByUsernameAsync(string username);
        Task<IEnumerable<DoctorDto>> GetDoctorsDTOAsync();
        Task<DoctorDto> GetDoctorAsync(string username);
        void Update(Doctor doctor);
        Task<bool> SaveAllAsync();
    }
}