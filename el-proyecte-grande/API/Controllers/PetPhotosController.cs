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
        public async Task<IActionResult> CreatePhoto([FromForm]IFormFile content,[FromForm] string postId )
        {
            byte[] contentToBytes;
            using(var memoryStream = new MemoryStream())
            {
                content.CopyTo(memoryStream);
                contentToBytes = memoryStream.ToArray();
            }
            var id = new Guid();
            PetPhoto petPhoto = new()
            {
                ID = id,
                Content = contentToBytes,
                PostId = postId

            };
            return HandleResult(await Mediator.Send(new Create.Command { PetPhoto = petPhoto }));
        }
    }
}
