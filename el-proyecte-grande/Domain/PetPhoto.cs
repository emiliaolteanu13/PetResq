using Microsoft.AspNetCore.Http;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class PetPhoto
    {
        public string Id { get; set; }
        [NotMapped]
        public IFormFile Content { get; set; }
        public string PostId { get; set; }
    }
}
