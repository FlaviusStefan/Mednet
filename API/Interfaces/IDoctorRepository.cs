using API.Entities;

namespace API.Interfaces
{
    public interface IDoctorRepository
    {
        void Update(Doctor doctor);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Doctor>> GetDoctorsAsync();
        Task<Doctor> GetDoctorByIdAsync(int id);
        Task<Doctor> GetDoctorByUsernameAsync(string username);
    }
}