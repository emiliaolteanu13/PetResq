using Domain;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;

namespace Application.Services
{
    public class EmailSenderService
    {
        private readonly string _apiKey = null;
        public EmailSenderService(string apiKey)
        {
            _apiKey = apiKey;
        }

        public async Task Execute(string userEmail, string userName, Comment comment, Post post)
        {
            var client = new SendGridClient(_apiKey);
            var from = new EmailAddress("subtilebug.exe@gmail.com", "PetResqCC");
            var subject = "You have a new comment on Petresq Chat";
            var to = new EmailAddress(userEmail, userName);
            var plainTextContent = "and easy to do anywhere, even with C#";
            var htmlContent = $"<h2>{comment.Username} commented on your {post.Title}. Check it out" + $"<a href=\"http://localhost:3000/posts/{post.ID}\"> Click here!</a>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            await client.SendEmailAsync(msg);
        }

    }
}