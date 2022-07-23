using Fhirata.AspNetCore.Data;
using Fhirata.AspNetCore.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Fhirata.AspNetCore.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FhirataController : ControllerBase
    {
        private IdentityContext dbContext;

        public FhirataController(IdentityContext dbContext)
        {
            this.dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        [HttpDelete]
        [Route("mapping")]
        [ProducesDefaultResponseType(typeof(ApiResponse))]
        [ProducesErrorResponseType(typeof(ApiResponse))]
        public async Task<IActionResult> DeleteMapping([FromBody] Guid id)
        {
            try
            {
                var user = await dbContext.Users.FirstOrDefaultAsync(row => row.UserName == User.Identity.Name);
                if (user == null)
                {
                    return StatusCode(401, new SaveMappingResponse { Success = false, Message = "Unauthorized (user not found)" });
                }

                var row = await dbContext
                    .Mappings
                    .Include(row => row.User)
                    .FirstOrDefaultAsync(row => row.Id == id);
                if (row == null)
                {
                    return StatusCode(404, new SaveMappingResponse { Success = false, Message = "Record not found" });
                }

                if (row.UserId != user.Id)
                {
                    return StatusCode(401, new SaveMappingResponse { Success = false, Message = "You have no permissions to delete this record" });
                }
                dbContext.Remove(row);
                await dbContext.SaveChangesAsync();
                
                return this.ApiSuccess();
            }
            catch (Exception ex)
            {
                return this.ApiError(ex);
            }
        }

        [HttpPost]
        [Route("evaluate")]
        [Produces(typeof(TransformResponse))]
        [ProducesErrorResponseType(typeof(ApiResponse))]
        public async Task<ActionResult<TransformResponse>> Evaluate([FromBody] TransformRequest request)
        {
            request = request ?? new TransformRequest();

            try
            {
                JsonSerializer.Deserialize<dynamic>(request.Json);
            }
            catch (JsonException jex)
            {
                return this.ApiError(jex, 400);
            }

            var result = new TransformResponse();
            result.Json = result.Json;
            result.Expression = result.Expression;
            result.Result = "Some text as a result of a successful data transformation algorithm on server";
            return result;
        }

        [HttpGet]
        [Route("mapping/{id?}")]
        [Produces(typeof(StoreResponse<UserMappingOption>))]
        [ProducesErrorResponseType(typeof(ApiResponse))]
        [AllowAnonymous]
        public async Task<ActionResult<StoreResponse<UserMappingOption>>> GetMappings([FromRoute] Guid? id, [FromQuery] StoreRequest request)
        {
            var response = new StoreResponse<UserMappingOption>();

            try
            {
                request = request ?? new StoreRequest();

                // Total number of records
                response.Total = dbContext.Mappings.Count();

                var q = dbContext
                    .Mappings
                    .Include(row => row.User)
                    .AsQueryable();

                if (id != null)
                {
                    q = q.Where(row => row.Id == id);
                }

                q = q.OrderBy(row => row.Name);

                if (request != null)
                {
                    if (request.Start != null)
                    {
                        q = q.Skip(request.Start.Value);
                    }
                    if (request.Limit != null)
                    {
                        q = q.Take(request.Limit.Value);
                    }
                }
                response.Data = await q.ToListAsync();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return this.ApiError(ex);
            }
        }

        [HttpPost]
        [Route("mapping")]
        [ProducesDefaultResponseType(typeof(SaveMappingResponse))]
        [ProducesErrorResponseType(typeof(ApiResponse))]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<ActionResult<SaveMappingResponse>> SaveMapping([FromBody] SaveMappingRequest request)
        {
            if (request == null) throw new ArgumentNullException(nameof(request));

            try
            {
                var user = await dbContext.Users.FirstOrDefaultAsync(row => row.UserName == User.Identity.Name);
                if (user == null)
                {
                    return StatusCode(401, new SaveMappingResponse { Success = false, Message = "Unauthorized (user not found)" });
                }

                UserMappingOption row = null;

                if (request.Id == null)
                {
                    row = new UserMappingOption();
                    row.CreateDate = DateTime.Now;
                    row.UserId = user.Id;
                    dbContext.Mappings.Add(row);
                }
                else
                {
                    row = await dbContext.Mappings.FirstOrDefaultAsync(row => row.Id == request.Id);
                    if (row == null)
                    {
                        return StatusCode(404, new SaveMappingResponse { Success = false, Message = "Record not found" });
                    }
                    if (row.UserId != user.Id)
                    {
                        return StatusCode(401, new SaveMappingResponse { Success = false, Message = "You have no permissions to edit this record" });
                    }
                }
                row.Name = request.Name;
                row.Json = request.Json;
                row.Expression = request.Expression;
                row.CodeMappings = request.CodeMappings;
                row.Server = request.Server;

                await dbContext.SaveChangesAsync();

                var result = new SaveMappingResponse { Success = true, Message = "Saved ", Id = row.Id };
                return result;
            }
            catch (Exception ex)
            {
                return this.ApiError(ex);
            }
        }
    }
}