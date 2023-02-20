using System.Threading.Tasks;

namespace WeldingContest.Services.FileServices
{
    public interface IFileService<T> where T : class
    {
        void Create(T entity);
    }
}
