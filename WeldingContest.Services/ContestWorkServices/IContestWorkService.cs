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
        Task<IList<ContestWork>> GetByContestTitleAsyncRange(string title, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetByContestantRFIDAsync(string RFID);
        Task<IList<ContestWork>> GetByContestantSurnameAsyncRange(string surname, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetByContestantCompanyAsyncRange(string company, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetByNominationTitleAsyncRange(string title, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetByWeldingTypeAsyncRange(string weldingType, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetBySampleTypeAsyncRange(string sampleType, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetByContestantID(string ID);
        Task<IList<ContestWork>> GetRangeByContestName(int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetRangeByContestantSurname(int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetRangeByContestantCompany(int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetRangeByNominationTitle(int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetRangeBySampleType(int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetRangeByWeldingType(int pageNumber, int rowsNumber);
    }
}
