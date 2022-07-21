namespace FhirEvaluator.AspNetCore.Models
{
    public class SessionInfo
    {
        public string? Email { get; set; }

        public bool IsAuthenticated { get; set; }
    }
}
