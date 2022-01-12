using el_proyecte_grande.EntityFramework;
using el_proyecte_grande.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace el_proyecte_grande.DAL
{
    public class PhotoService : IRepository<PetPhoto>
    {
        private PetContext _context;
        public PhotoService()
        {

        }
        public PhotoService(PetContext context)//logger!!!!!
        {
            _context = context;
        }
        public IEnumerable<PetPhoto> PopulatePetRescueDB()
        {
            List<PetPhoto> photos = new List<PetPhoto>()
            {
                new PetPhoto()
                {
                    Path = "..\\ClientApp\\src\\img\\ewilkpisicaverde.jpg",
                    PostID = 1
                },
                new PetPhoto()
                {
                    Path = "..\\ClientApp\\src\\img\\pisica-verde5.jpg",
                    PostID = 1
                },
                new PetPhoto()
                {
                    Path = "..\\ClientApp\\src\\img\\Pisica-Verde-Ochelari.jpg",
                    PostID = 1
                },
                new PetPhoto()
                {
                    Path = "..\\ClientApp\\src\\img\\pomeranian1.jpg",
                    PostID = 2
                },
                new PetPhoto()
                {
                    Path = "..\\ClientApp\\src\\img\\pomeranian2.jpg",
                    PostID = 2
                }
            };
            return photos;
        }
        public void Add(PetPhoto t)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public PetPhoto Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<PetPhoto> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(int id, PetPhoto t)
        {
            throw new NotImplementedException();
        }
    }
}
