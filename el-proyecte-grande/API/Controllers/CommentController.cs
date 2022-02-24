using System;
using System.Threading.Tasks;
using Application.Comments;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CommentController : BaseAPIController
    {
        [HttpGet]
        public async Task<IActionResult> GetAllComments(){
            return HandleResult ( await Mediator.Send(new List.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment(Comment comment){
            return HandleResult( await Mediator.Send(new Create.Command{Comment = comment}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(Guid id){
            return HandleResult( await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPost(Guid id, Comment comment){
            comment.ID = id;
            return HandleResult( await Mediator.Send( new Edit.Command{Comment=comment}));
        }
    }
}