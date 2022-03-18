using Application.Comments;
using Application.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{

    [AllowAnonymous]
    public class CommentController : BaseAPIController
    {
        private readonly EmailSenderService _emailSenderService;
        public CommentController(EmailSenderService emailSenderService)
        {
            _emailSenderService = emailSenderService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllComments()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment(Comment comment)
        {

            return HandleResult(await Mediator.Send(new Create.Command { Comment = comment, EmailSender=_emailSenderService }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditPost(Guid id, Comment comment)
        {
            comment.ID = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Comment = comment }));
        }
    }
}