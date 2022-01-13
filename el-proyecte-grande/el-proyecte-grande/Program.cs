using el_proyecte_grande.DAL;
using el_proyecte_grande.EntityFramework;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/// <summary>
/// this file was auto genreted and we can use it as an exaple for our first controller
/// basicly this is auto generated and its the starting point
///  :*
/// </summary>

namespace el_proyecte_grande
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var postService = new PostService();
            var userService = new UserService();
            var photoService = new PhotoService();
            //var options = new DbContextOptionsBuilder<PetContext>().UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=PetRescue;Integrated Security=true;").Options;
            //using var db = new PetContext(options);
            //db.Database.EnsureDeleted();
            //db.Database.EnsureCreated();
            //var photos = photoService.PopulatePetRescueDB();
            //db.Photos.AddRange(photos);
            //var posts = postService.PopulatePetRescueDB();
            //db.Posts.AddRange(posts);
            //var users = userService.PopulatePetRescueDB();
            //db.Users.AddRange(users);
            //db.SaveChanges();
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;

            try
            {
                var context = services.GetRequiredService<PetContext>();
                //var userManager = services.GetRequiredService<UserManager<PetContext>>();
                await context.Database.MigrateAsync();
                await Seed.SeedData(context);
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occured during migraiton");
            }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
