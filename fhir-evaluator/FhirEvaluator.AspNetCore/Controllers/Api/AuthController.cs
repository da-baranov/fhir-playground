using FhirEvaluator.AspNetCore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace FhirEvaluator.AspNetCore.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly RoleManager<FhirEvaluator.AspNetCore.Data.IdentityRole> _roleManager;

        private readonly UserManager<FhirEvaluator.AspNetCore.Data.IdentityUser> _userManager;

        public AuthController(
            UserManager<FhirEvaluator.AspNetCore.Data.IdentityUser> userManager,
            RoleManager<FhirEvaluator.AspNetCore.Data.IdentityRole> roleManager,
            IConfiguration configuration)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
            this._configuration = configuration;
        }

        [Route("session")]
        [HttpGet]
        public SessionInfo GetUserSessionInfo()
        {
            var result = new SessionInfo();
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                result.IsAuthenticated = true;
                result.Email = User.Identity.Name;
            }
            return result;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);

            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = GetToken(authClaims);
                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                HttpContext.Response.Cookies.Append("jwt", tokenString, new CookieOptions() { HttpOnly = true });

                return Ok(new AuthResponse
                {
                    Token = tokenString,
                    Expiration = token.ValidTo,
                    Success = true,
                    Message = "Login successful"
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            return Ok(new AuthResponse { Success = true, Message = "Logout successfull" });
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new AuthResponse { Success = false, Message = "User already exists!" });

            FhirEvaluator.AspNetCore.Data.IdentityUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Email
            };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new AuthResponse { Success = false, Message = "User creation failed! Please check user details and try again." });
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var token = GetToken(authClaims);
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            HttpContext.Response.Cookies.Append("jwt", tokenString, new CookieOptions() { HttpOnly = true });

            return Ok(new AuthResponse
            {
                Success = true,
                Message = "User created successfully!",
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo
            });
        }
        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(1),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}