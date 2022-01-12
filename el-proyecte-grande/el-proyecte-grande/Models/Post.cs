using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace el_proyecte_grande.Models
{
    public class Post
    {
        public int ID { get; set; }
        public string Location { get; set; }
        public int UserID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public PetType PetType { get; set; }
        public StatusType StatusType { get; set; }
    }
}
