using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Posts;
using Domain;

using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    ///after we build rutes for new controllers we need to restart the api solution using dotnet watch run
    public class PostsController : BaseAPIController
    {

        [HttpGet] // posts
        public async Task<ActionResult<List<Post>>> GetAllPosts()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")] // posts/id
        public async Task<ActionResult<Post>> GetPost(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost(Post post)
        {
            return Ok(await Mediator.Send(new Create.Command {Post=post}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPost(Guid id, Post post)
        {
            post.ID = id;
            return Ok(await Mediator.Send(new Edit.Command{Post = post}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}