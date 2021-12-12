using System.Security.Claims;

namespace Conny.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal user)
        { 
            var aa  = user.FindFirst(ClaimTypes.Name)?.Value;
            return aa;
        }
        
        public static int GetUserId(this ClaimsPrincipal user)
        { 
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
        }
    }
}