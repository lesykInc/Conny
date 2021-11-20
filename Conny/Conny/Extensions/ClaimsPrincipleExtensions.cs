using System;
using System.Security.Claims;

namespace Conny.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            var claim = user.FindFirst(ClaimTypes.NameIdentifier);
            return claim?.Value;
        }
    }
}