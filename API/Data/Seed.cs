using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedPatients(DataContext context)
        {
            if(await context.Patients.AnyAsync())
                return;

            var patientData = await File.ReadAllTextAsync("Data/PatientSeedData.json");

            var options = new JsonSerializerOptions{ PropertyNameCaseInsensitive = true};

            var patients = JsonSerializer.Deserialize<List<Patient>>(patientData);

            foreach(var patient in patients)
            {
                using var hmac = new HMACSHA512();

                patient.UserName = patient.UserName.ToLower();
                patient.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                patient.PasswordSalt = hmac.Key;

                context.Patients.Add(patient);
            }

            await context.SaveChangesAsync();
        }

        public static async Task SeedDoctors(DataContext context)
        {
            if(await context.Doctors.AnyAsync())
                return;

            var doctorData = await File.ReadAllTextAsync("Data/DoctorSeedData.json");

            var options = new JsonSerializerOptions{ PropertyNameCaseInsensitive = true};

            var doctors = JsonSerializer.Deserialize<List<Doctor>>(doctorData);

            foreach(var doctor in doctors)
            {
                using var hmac = new HMACSHA512();

                doctor.UserName = doctor.UserName.ToLower();
                doctor.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                doctor.PasswordSalt = hmac.Key;

                context.Doctors.Add(doctor);
            }

            await context.SaveChangesAsync();
        }
    }
}