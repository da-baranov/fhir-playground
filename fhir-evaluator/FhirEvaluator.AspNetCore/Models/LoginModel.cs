using System.ComponentModel.DataAnnotations;

namespace FhirEvaluator.AspNetCore.Models;

public class LoginModel
{
    [Required(ErrorMessage = "User ID (email) is required")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; set; }
}