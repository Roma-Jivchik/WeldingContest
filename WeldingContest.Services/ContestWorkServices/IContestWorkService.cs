using System.Threading.Tasks;
using System.Collections.Generic;
using WeldingContest.Services.Entities.ContestWorks;

namespace WeldingContest.Services.ContestWorkServices
{
    public interface IContestWorkService : IServiceBase<ContestWork>
    {
        Task<int> GetPagesNumber(int rowsNumber);
        Task<IList<ContestWork>> GetAllByContestID(string contestID);
        Task<IList<ContestWork>> GetRangeByContestID(string contestID, int pageNumber, int rowsNumber);
    }
}
