using el_proyecte_grande.EntityFramework;
using el_proyecte_grande.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace el_proyecte_grande.DAL
{
    public class UserService : IRepository<User>
    {
        private PetContext _context;
        public UserService()
        {

        }
        public UserService(PetContext context)//logger!!!!!
        {
            _context = context;
        }
        public IEnumerable<User> PopulatePetRescueDB()
        {
            List<User> users = new List<User>()
            {
                new User()
                {
                    Name = "Emi",
                    Email = "emiliaolteanu13@gmail.com",
                    Password = "psspss",
                    PhoneNumber = "0364256"
                }
            };
            return users;
        }
        public void Add(User t)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }

        public User Get(int id)
        {
            throw new NotImplementedException();
        }

        public List<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public void Update(int id, User t)
        {
            throw new NotImplementedException();
        }
    }
}
