using System.Collections.Generic;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestWorks;

namespace WeldingContest.Services.NominationServices
{
    public interface INominationService : IServiceBase<Nomination>
    {
        Task<IList<Nomination>> GetBySampleTypeRangeAsync(string sampleType, int rowsNumber, int pageNumber);
        Task<IList<Nomination>> GetByWeldingTypeRangeAsync(string weldingType, int rowsNumber, int pageNumber);
        Task<Nomination> GetByTitleAsync(string title);
        Task<IList<Nomination>> GetByContestantIDRangeAsync(string ID, int rowsNumber, int pageNumber);
        Task<IList<Nomination>> GetAllBySampleType();
        Task<IList<Nomination>> GetAllByWeldingType();
    }
}
