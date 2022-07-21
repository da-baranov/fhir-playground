using FhirEvaluator.AspNetCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FhirEvaluator.AspNetCore.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class FhirataController : ControllerBase
    {
        [HttpPost]
        [Route("evaluate")]
        public IActionResult Evaluate([FromBody] TransformRequest request)
        {
            return null;
        }
    }
}
