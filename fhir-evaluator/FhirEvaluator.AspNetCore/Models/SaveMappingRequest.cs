using System.ComponentModel.DataAnnotations;

namespace Fhirata.AspNetCore.Models
{
    public class SaveMappingRequest
    {
        public Guid? Id { get; set; }

        [Required]
        [MinLength(2, ErrorMessage = "The Name must me a string with a minimum length of 2")]
        public string? Name { get; set; }

        public string? Json { get; set; }

        public string? Expression { get; set; }

        public bool ConfirmOverwrite { get; set; }
    }
}
