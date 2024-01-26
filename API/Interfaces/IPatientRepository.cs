using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPatientRepository
    {
        Task<IEnumerable<Patient>> GetPatientsAsync();
        Task<Patient> GetPatientByIdAsync(int id);
        Task<Patient> GetPatientByUsernameAsync(string username);
        Task<IEnumerable<PatientDto>> GetPatientsDTOAsync();
        Task<PatientDto> GetPatientAsync(string username);
        void Update(Patient patient);
        Task<bool> SaveAllAsync();
    }
}