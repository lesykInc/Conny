using System.Threading.Tasks;
using Conny.DTOs;
using Conny.Entities;
using Conny.Helpers;

namespace Conny.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int likedUserIfd);
        Task<AppUser> GetUserWithLikes(int userId);
        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesPams);
    }
}