using Fhirata.AspNetCore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Fhirata.AspNetCore.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        private readonly RoleManager<Fhirata.AspNetCore.Data.IdentityRole> _roleManager;

        private readonly UserManager<Fhirata.AspNetCore.Data.IdentityUser> _userManager;

        private readonly ILogger<AuthController> _logger;

        public AuthController(
            UserManager<Fhirata.AspNetCore.Data.IdentityUser> userManager,
            RoleManager<Fhirata.AspNetCore.Data.IdentityRole> roleManager,
            IConfiguration configuration,
            ILogger<AuthController> logger)
        {
            this._userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            this._roleManager = roleManager ?? throw new ArgumentNullException(nameof(roleManager));
            this._configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
            this._logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [Route("session")]
        [HttpGet]
        public ActionResult<SessionInfo> GetUserSessionInfo()
        {
            var result = new SessionInfo();
            if (User.Identity != null && User.Identity.IsAuthenticated)
            {
                result.IsAuthenticated = true;
                result.Email = User.Identity.Name;
            }
            return result;
        }

        /// <summary>
        /// Authenticates a user
        /// </summary>
        /// <param name="model">User id and password</param>
        /// <returns></returns>
        [HttpPost]
        [Route("login")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginModel model)
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

                return new AuthResponse
                {
                    Token = tokenString,
                    Expiration = token.ValidTo,
                    Success = true,
                    Message = "Login successful"
                };
            }
            return StatusCode(401, new AuthResponse { Success = false, Message = "Logon failed." });
        }

        [HttpPost]
        [Route("logout")]
        public ActionResult<AuthResponse> Logout()
        {
            return new AuthResponse { Success = true, Message = "Logout successfull" };
        }

        [HttpPost]
        [Route("register")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new AuthResponse { Success = false, Message = "User already exists!" });

            Fhirata.AspNetCore.Data.IdentityUser user = new()
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

            return new AuthResponse
            {
                Success = true,
                Message = "User created successfully!",
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = token.ValidTo
            };
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