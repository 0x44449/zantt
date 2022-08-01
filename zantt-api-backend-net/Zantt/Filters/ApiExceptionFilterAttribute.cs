using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Zantt.Models;

namespace Zantt.Filters;

public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
{
    public override void OnException(ExceptionContext context)
    {
        context.HttpContext.Response.StatusCode = 200;

        var response = new ApiResponse<object>
        {
            Success = false,
            ErrorCode = "500",
            ErrorMessage = context.Exception.Message
        };

        context.Result = new JsonResult(response);

        base.OnException(context);
    }
}
