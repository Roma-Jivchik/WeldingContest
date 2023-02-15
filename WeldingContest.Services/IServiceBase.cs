using System.Collections.Generic;
using System.Threading.Tasks;

namespace WeldingContest.Services
{
    public interface IServiceBase<T> where T : class
    {
        Task<IList<T>> GetAll();
        Task<IList<T>> GetRange(int pageNumber, int rowsNumber);
        Task<T> Get(string id);
        Task<T> Create(T entity);
        Task<T> Update(T entity);
        Task Remove(string id);
        Task SaveChanges();
    }
}
