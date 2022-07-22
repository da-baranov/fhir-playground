using Fhirata.AspNetCore.Models;
using Microsoft.AspNetCore.Mvc;

namespace Fhirata.AspNetCore.Controllers.Api
{
    public static class Extensions
    {
        public static ActionResult ApiError(this ControllerBase controller, Exception exception, int statusCode = 500)
        {
            var result = new ApiResponse();
            result.Success = false;
            result.Message = exception.Message;
            if (exception.InnerException != null)
            {
                result.Message += Environment.NewLine + exception.InnerException.Message;
            }
            result.Stack = exception.StackTrace;
            return controller.StatusCode(statusCode, result);
        }

        public static ActionResult ApiSuccess(this ControllerBase controller, string message = null)
        {
            var result = new ApiResponse();
            result.Message = message;
            return controller.Ok(result);
        }

        public static ActionResult ApiModelError(this ControllerBase controller)
        {
            var list = new List<string>();
            var modelState = controller.ModelState;
            foreach (var modelStateKey in modelState.Keys)
            {
                var modelStateValue = modelState[modelStateKey];
                foreach (var error in modelStateValue.Errors)
                {
                    list.Add(error.ErrorMessage);
                }
            }
            var errorMessage = string.Join(Environment.NewLine, list);
            return controller.StatusCode(400, new ApiResponse { Success = false, Message = errorMessage });
        }
    }
}
