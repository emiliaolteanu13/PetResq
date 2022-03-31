using Application.ProfilePhotos;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ProfilePhotosController : BaseAPIController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfilePhoto(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePhoto([FromForm] IFormFile content, [FromForm] string userEmail)
        {
            var id = new Guid();

            string fileName = content.FileName;
            string extension = Path.GetExtension(fileName);
            string folderName = @".\wwwroot\profiles";
            byte[] contentToBytes;
            using (var memoryStream = new MemoryStream())
            {
                content.CopyTo(memoryStream);
                contentToBytes = memoryStream.ToArray();
            }

            string pathString = System.IO.Path.Combine(folderName, fileName.Replace(extension, "") + userEmail + extension);
            System.IO.File.WriteAllBytes(pathString, contentToBytes);

            ProfilePhoto profilePhoto = new()
            {
                ID = id,
                Src = fileName.Replace(extension, "") + userEmail + extension,
                Username = userEmail

            };
            return HandleResult(await Mediator.Send(new Create.Command { ProfilePhoto = profilePhoto }));
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
