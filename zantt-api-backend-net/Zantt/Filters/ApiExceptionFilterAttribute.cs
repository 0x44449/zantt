using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Zantt.Exceptions;
using Zantt.Models;

namespace Zantt.Filters;

public class ApiExceptionFilterAttribute : ExceptionFilterAttribute
{
    private readonly ILogger<ApiExceptionFilterAttribute> logger;

    public ApiExceptionFilterAttribute(ILogger<ApiExceptionFilterAttribute> logger)
    {
        this.logger = logger;
    }

    public override void OnException(ExceptionContext context)
    {
        context.HttpContext.Response.StatusCode = 200;

        if (context.Exception is WellKnownApiException wkae)
        {
            logger.LogInformation($"WellKnownApiException raised -> path: [{context.HttpContext.Request.Method}]{context.HttpContext.Request.Path.Value}, errorCode: {wkae.ErrorCode}, errorMessage: {wkae.Message}");
            var response = new ApiResponse<object>
            {
                Success = false,
                ErrorCode = wkae.ErrorCode,
                ErrorMessage = wkae.Message
            };
            context.Result = new JsonResult(response);
        }
        else
        {
            var response = new ApiResponse<object>
            {
                Success = false,
                ErrorCode = "500",
                ErrorMessage = context.Exception.Message
            };
            context.Result = new JsonResult(response);
        }

        base.OnException(context);
    }
}
