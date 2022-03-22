using System;

namespace Domain
{
    public class PetPhoto
    {
        public Guid ID { get; set; }
        public byte[] Content { get; set; }
        public string PostId { get; set; }
    }
}
