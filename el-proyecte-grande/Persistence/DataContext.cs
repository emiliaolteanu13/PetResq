using Microsoft.EntityFrameworkCore;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
// 
//  dotnet tool install --global dotnet-ef --version 5.0.1

// add this to API
// dotnet add package Microsoft.EntityFrameworkCore.Design --version 5.0.1

// dotnet ef migrations add InitialCreate -p Persistence -s API

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }

        public DbSet<ProfilePhoto> ProfilePhotos { get; set; } 

        public DbSet<Comment> Comments { get; set; }
        public DbSet<PetPhoto> PetPhotos { get; set; }
    }
}
