using System.Text.Json.Serialization;

namespace Fhirata.AspNetCore.Data
{
    public class UserMappingOption
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        [JsonIgnore]
        public Guid UserId { get; set; }

        public string? Name { get; set; }

        [JsonIgnore]
        public IdentityUser? User { get; set; }

        public string? UserName
        {
            get
            {
                return User?.UserName;
            }
        }

        public string? Json { get; set; }

        public string? Expression { get; set; }

        public DateTime? CreateDate { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string? Server { get; set; }

        /// <summary>
        /// Some code mappings (LOINC, SNOMED etc) stored as text data (text, json, csv)
        /// </summary>
        public string? CodeMappings { get; set; }

    }
}
