using System;
using System.Linq;
using Domain;
using Persistence;

namespace API.Services
{
    public class EmailService
    {
        private DataContext _context { get; set; }
        public Comment Comment{get;set;}
        public EmailService(DataContext context, Comment comment){
            _context = context;
            Comment = comment;
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
            await EmailSenderService.Execute(GetUserEmail(), GetUserName());
        }
    }
}