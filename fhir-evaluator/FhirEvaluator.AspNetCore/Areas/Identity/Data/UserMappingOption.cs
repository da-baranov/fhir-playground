namespace FhirEvaluator.AspNetCore.Data
{
    public class UserMappingOption
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string? Name { get; set; }

        public IdentityUser? User { get; set; }
    }
}
