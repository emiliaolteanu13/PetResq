using System;
using System.Linq;
using Domain;
using Persistence;

namespace Application.Services
{
    public class EmailService
    {
        private DataContext _context { get; set; }
        public Comment Comment{get;set;}
        private EmailSenderService _emailSenderService { get; set; }
        public EmailService(DataContext context, Comment comment)
        {
            _context = context;
            Comment = comment;
            _emailSenderService = new EmailSenderService();

        }
        public Post GetPost()
        {
            return _context.Posts.Where(p => p.ID == Comment.PostId).FirstOrDefault();
        }
        public string GetUserEmail()
        {
            Post post = _context.Posts.Where(p => p.ID == Comment.PostId).FirstOrDefault();
            string email = _context.Users.Where(u => u.Id == post.UserID.ToString()).FirstOrDefault().Email;
            return email;
        }

        public string GetUserName()
        {
            Post post = _context.Posts.Where(p => p.ID == Comment.PostId).FirstOrDefault();
            string userName = _context.Users.Where(u => u.Id == post.UserID.ToString()).FirstOrDefault().UserName;
            return userName;
        }

        public async void SendEmail()
        {
            await _emailSenderService.Execute(GetUserEmail(), GetUserName());
        }
    }
}