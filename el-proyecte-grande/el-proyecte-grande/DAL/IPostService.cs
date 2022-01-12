using el_proyecte_grande.Models;
using System.Collections.Generic;

namespace el_proyecte_grande.DAL
{
    public interface IPostService
    {
        List<Post> GetAll();
        Post Get(int id);
        void Add(Post post);
        void Delete(int id);
        void Update(int id, Post post);
    }
}
