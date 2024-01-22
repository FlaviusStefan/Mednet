using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if(await context.Users.AnyAsync())
                return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions{ PropertyNameCaseInsensitive = true};

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            foreach(var user in users)
            {
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
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