using System.ComponentModel.DataAnnotations;

namespace Fhirata.AspNetCore.Models;

/// <summary>
/// User authentication
/// </summary>
public class LoginModel
{
    /// <summary>
    /// User ID (email)
    /// </summary>
    [Required(ErrorMessage = "User ID (email) is required")]
    public string? Email { get; set; }

    /// <summary>
    /// User password
    /// </summary>
    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; set; }
}