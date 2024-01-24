using API.Extensions;

namespace API.Entities
{
    public class Doctor : AppUser
    {
        public string Specialization { get; set; }
    }

    // public enum Specialization {
    // Cardiology,
    // Dermatology,
    // Endocrinology,
    // Gastroenterology,
    // Hematology,
    // InfectiousDiseases,
    // Nephrology,
    // Neurology,
    // ObstetricsAndGynecology,
    // Oncology,
    // Ophthalmology,
    // Orthopedics,
    // Otolaryngology,
    // Pediatrics,
    // Psychiatry,
    // Pulmonology,
    // Radiology,
    // Rheumatology,
    // Surgery,
    // Urology
    // }    
}