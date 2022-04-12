using System;
using System.Threading.Tasks;
using Application.Posts;
using Application.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class PostsController : BaseAPIController
    {
        private readonly GoogleLocationService _googleLocationService;

        public PostsController(GoogleLocationService googleLocationService)
        {
            _googleLocationService = googleLocationService;
        }
        [HttpGet("googleApiKey")]
        public async Task<string> GetApiKey()
        {
            return _googleLocationService.GoogleAPIKey;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            return HandleResult( await Mediator.Send(new List.Query()));
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> PostByStatus(string status)
        {
            return HandleResult(await Mediator.Send(new PostsFilteredByStatus.Query { Status = status }));
        }

        [HttpGet("pet/{pet}")]
        public async Task<IActionResult> PostByPet(string pet)
        {
            return HandleResult(await Mediator.Send(new PostsFilteredByPet.Query { Pet = pet}));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPost(Guid id)
        {

            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost(Post post)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Post=post}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPost(Guid id, Post post)
        {
            post.ID = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Post = post}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}