using System;
using System.Threading.Tasks;
using Conny.Extensions;
using Conny.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Conny.Helpers
{
    public class LogUserActivity: IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (resultContext.HttpContext.User.Identity is { IsAuthenticated: false }) return;

            var userId = resultContext.HttpContext.User.GetUserId();
            var repo = resultContext.HttpContext.RequestServices.GetService<IUserRepository>();
            var user = await repo.GetUserByIdAsync(userId);
            user.LastActive = DateTime.Now;
            await repo.SavaAllAsync();
        }
    }
}