using System;

namespace Domain
{
    public class PetPhoto
    {
        public Guid ID { get; set; }
        public string Src { get; set; }
        public string PostId { get; set; }
    }
}
