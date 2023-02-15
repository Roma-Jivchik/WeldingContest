using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestMembers;

namespace WeldingContest.Services.ContestServices
{
    public interface IContestService : IServiceBase<Contest>
    {
        Task<Contest> GetByBeginDateAsync(string beginDate);
    }
}
