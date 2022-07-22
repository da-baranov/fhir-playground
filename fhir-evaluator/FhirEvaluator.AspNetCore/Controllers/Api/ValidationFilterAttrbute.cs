using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;

namespace Fhirata.AspNetCore.Controllers.Api
{
    public class ValidationFilterAttribute : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                // context.Result = new UnprocessableEntityObjectResult(context.ModelState);
                context.Result = (context.Controller as ControllerBase).ApiModelError();
            }
        }
        public void OnActionExecuted(ActionExecutedContext context) { }
    }
}
