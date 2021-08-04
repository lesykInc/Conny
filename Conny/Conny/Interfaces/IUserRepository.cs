using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Conny.DTOs;
using Conny.Entities;

namespace Conny.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SavaAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserByIdAsync(int id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<IEnumerable<MemberDto>> GetMembersAsync();
        Task<MemberDto> GetMemberAsync(string username);

    }
}