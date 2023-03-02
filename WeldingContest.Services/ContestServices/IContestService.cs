using System.Collections.Generic;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestMembers;

namespace WeldingContest.Services.ContestServices
{
    public interface IContestService : IServiceBase<Contest>
    {
        Task<Contest> GetByBeginDateAsync(string beginDate);
        Task<Contest> GetByTitleAsync(string title);
        Task<Contest> GetByEndDateAsync(string endDate);
        Task<IList<Contest>> GetByContestantIDAsync(string ID, int pageNumber, int rowsNumber);
        Task<IList<Contest>> GetRangeByTitle();
        Task<IList<Contest>> GetRangeByEndDate();
    }
}
