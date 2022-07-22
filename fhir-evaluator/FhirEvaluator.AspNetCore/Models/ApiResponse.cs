namespace Fhirata.AspNetCore.Models
{
    public class ApiResponse
    {
        public ApiResponse() { }

        public ApiResponse(bool success, string? message = null)
        {
            Success = success;
            Message = message;
        }

        public bool Success { get; set; }

        public string? Message { get; set; }

        public string? Stack { get; set; }
    }
}
