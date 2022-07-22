namespace Fhirata.AspNetCore.Models
{
    public class AuthResponse : ApiResponse
    {
        public string? Token { get; set; }

        public DateTime? Expiration { get; set; }
    }
}
