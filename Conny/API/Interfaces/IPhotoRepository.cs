using System.Collections.Generic;
using System.Threading.Tasks;
using Conny.DTOs;
using Conny.Entities;

namespace Conny.Interfaces
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<PhotoForApprovalDto>> GetUnapprovedPhotos();
        Task<Photo> GetPhotoById(int id);
        void RemovePhoto(Photo photo);
    }
}