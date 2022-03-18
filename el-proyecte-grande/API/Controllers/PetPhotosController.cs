using Application.PetPhotos;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [AllowAnonymous]
    public class PetPhotosController : BaseAPIController
    {
        [HttpGet("{postId}")]
        public async Task<IActionResult> GetPetPhotos(Guid postId)
        {
            return HandleResult(await Mediator.Send(new List.Query { PostId = postId }));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePhoto(PetPhoto petPhoto)
        {
            return HandleResult(await Mediator.Send(new Create.Command { PetPhoto = petPhoto }));
        }
    }
}
