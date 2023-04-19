using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestMembers;

namespace WeldingContest.Services.ProtocolServices
{
    public interface IProtocolService<T> where T : class
    {
        Task<byte[]> Create(T entity);
    }
}
