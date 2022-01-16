using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    ///after we build rutes for new controllers we need to restart the api solution using dotnet watch run
    public class PostsController : BaseAPIController
    {
        private readonly DataContext _context;
        public PostsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet] // posts
        public async Task<ActionResult<List<Post>>> GetAllPosts() 
        {
            return await _context.Posts.ToListAsync();
        }

        [HttpGet("{id}")] // posts/id
        public async Task<ActionResult<Post>> GetPost(Guid id)
        {
            return await _context.Posts.FindAsync(id);
        }  
    }
}