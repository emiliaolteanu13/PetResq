using el_proyecte_grande.EntityFramework;
using el_proyecte_grande.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace el_proyecte_grande.DAL
{
    public class PetService : IPostService
    {
        private PetContext _context;
        public PetService()
        {

        }
        public PetService(PetContext context)//logger!!!!!
        {
            _context = context;
        }
        public void Add(Post post)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Post Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<Post> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(int id, Post post)
        {
            throw new NotImplementedException();
        }
    }
}
