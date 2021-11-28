using Conny.Entities;
using Microsoft.EntityFrameworkCore;

namespace Conny.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options): base(options)
        {
            
        }

        public DbSet<AppUser> Users { get; set; }
    }
}