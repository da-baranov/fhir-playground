﻿namespace FhirEvaluator.AspNetCore.Models
{
    public class AuthResponse
    {
        public bool Success { get; set; }
        
        public string? Message { get; set; }
        
        public string? Token { get; set; }

        public DateTime? Expiration { get; set; }
    }
}