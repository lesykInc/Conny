using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conny.DTOs;
using Conny.Entities;
using Conny.Extensions;
using Conny.Helpers;
using Conny.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Conny.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;

        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserLike> GetUserLike(int sourceUserId, int likedUserIfd)
        {
            return await _context.Likes.FindAsync(sourceUserId, likedUserIfd);
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users
                .Include(x => x.LikedUsers)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }

        public async Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            switch (likesParams.Predicate)
            {
                case "liked":
                    likes = likes.Where(like => like.SourceUserId == likesParams.UserId);
                    users = likes.Select(like => like.LikedUser);
                    break;
                case "likedBy":
                    likes = likes.Where(like => like.LikedUserId == likesParams.UserId);
                    users = likes.Select(like => like.LikedUser);
                    break;
            }

            var likedUsers = users.Select(user => new LikeDto()
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                City = user.City,
                Id = user.Id
            });

            return await PagedList<LikeDto>.CreateAsync(likedUsers, likesParams.PageNumber, likesParams.PageSize);
        }
    }
}