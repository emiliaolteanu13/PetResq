using el_proyecte_grande.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace el_proyecte_grande.EntityFramework
{
    public class PetContext : DbContext
    {
        public PetContext()
        {

        }
        public PetContext(DbContextOptions<PetContext> options): base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<PetPhoto> Photos { get; set; }
    }
}
