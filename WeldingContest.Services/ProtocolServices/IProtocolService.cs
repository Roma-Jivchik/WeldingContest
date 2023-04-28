using System.Threading.Tasks;

namespace WeldingContest.Services.ProtocolServices
{
    public interface IProtocolService<T> where T: class
    {
        Task<byte[]> Create(T entity);
    }
}
