using System.Threading.Tasks;
using Conny.Entities;

namespace Conny.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}