using Conny.Entities;

namespace Conny.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}