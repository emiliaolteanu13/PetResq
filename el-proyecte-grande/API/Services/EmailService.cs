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
            Post post = _context.Posts.Find(Comment.PostId);
            string email = _context.Users.Find(post.UserID).Email;
            return email;
        }
    }
}