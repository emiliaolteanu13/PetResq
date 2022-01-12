using el_proyecte_grande.EntityFramework;
using el_proyecte_grande.Models;
using System;
using System.Collections.Generic;

namespace el_proyecte_grande.DAL
{
    public class PostService : IRepository<Post>
    {
        private PetContext _context;
        public PostService()
        {

        }
        public PostService(PetContext context)//logger!!!!!
        {
            _context = context;
        }
        public IEnumerable<Post> PopulatePetRescueDB()
        {
            List<Post> posts = new List<Post>()
            {
                new Post()
                {
                    Location = "Parc Herastrau",
                    UserID = 0,
                    Title="Cat Found emergency",
                    Description="I found a green cat in the tree",
                    PetType= PetType.CAT,
                    StatusType=StatusType.FOUND
                },
                new Post()
                {
                    Location = "Timpuri Noi parc",
                    UserID = 1,
                    Title="Dog Lost",
                    Description="I lost my pomerian dog please help me",
                    PetType= PetType.DOG,
                    StatusType=StatusType.LOST
                }
            };
            return posts;
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
