using Application.PetPhotos;
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
    public class PetPhotosController : BaseAPIController
    {
        [HttpGet]
        public async Task<IActionResult> GetPetPhotos()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePhoto([FromForm] IFormFile content, [FromForm] string postId)
        {
            var id = new Guid();
            
            string fileName = content.FileName;
            string extension = Path.GetExtension(fileName);
            string folderName = @".\wwwroot\images";
            byte[] contentToBytes;
            using(var memoryStream = new MemoryStream())
            {
                content.CopyTo(memoryStream);
                contentToBytes = memoryStream.ToArray();
            }
            
            string pathString = System.IO.Path.Combine(folderName, fileName.Replace(extension,"")+postId+extension);
            System.IO.File.WriteAllBytes(pathString, contentToBytes);
            
            PetPhoto petPhoto = new()
            {
                ID = id,
                Src = fileName.Replace(extension, "") + postId + extension,
                PostId = postId

            };
            return HandleResult(await Mediator.Send(new Create.Command { PetPhoto = petPhoto }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
