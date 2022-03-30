using Application.ProfilePhotos;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilePhotosController : BaseAPIController
    {
        [HttpGet("{userEmail}")]
        public async Task<IActionResult> GetProfilePhoto(string userEmail)
        {
            return HandleResult(await Mediator.Send(new Details.Query { UserEmail = userEmail }));
        }

        

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
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
                UserEmail = userEmail

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
