using System.Collections.Generic;

namespace el_proyecte_grande.DAL
{
    public interface IRepository<T>
    {
        List<T> GetAll();
        T Get(int id);
        void Add(T t);
        void Delete(int id);
        void Update(int id, T t);
    }
}
