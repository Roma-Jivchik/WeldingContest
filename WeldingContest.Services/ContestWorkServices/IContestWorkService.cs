using System.Threading.Tasks;
using System.Collections.Generic;
using WeldingContest.Services.Entities.ContestWorks;

namespace WeldingContest.Services.ContestWorkServices
{
    public interface IContestWorkService : IServiceBase<ContestWork>
    {
        Task<int> GetPagesNumber(int rowsNumber);
        Task<IList<ContestWork>> GetAllByContestID(string contestID);
        Task<IList<ContestWork>> GetByContestantID(string ID);
        Task<IList<ContestWork>> GetRangeByContestID(string contestID, int pageNumber, int rowsNumber);
        Task<int> GetPagesNumberByContestTitle(string title, int rowsNumber);
        Task<int> GetPagesNumberByContestantSurname(string surname, int rowsNumber);
        Task<int> GetPagesNumberByContestantCompany(string company, int rowsNumber);
        Task<int> GetPagesNumberByNominationTitle(string title, int rowsNumber);
        Task<int> GetPagesNumberByWeldingType(string weldingType, int rowsNumber);
        Task<int> GetPagesNumberBySampleType(string sampleType, int rowsNumber);
        Task<IList<ContestWork>> GetSearchedByContestTitle(string title, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetSearchedByContestantRFID(string RFID, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetSearchedByContestantSurname(string surname, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetSearchedByContestantCompany(string company, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetSearchedByNominationTitle(string title, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetSearchedByWeldingType(string weldingType, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetSearchedBySampleType(string sampleType, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetSortedByContestName(string direction, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetSortedByContestantFullName(string direction, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetSortedByContestantCompany(string direction, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetSortedByNominationTitle(string direction, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetSortedBySampleType(string direction, int pageNumber, int rowsNumber);
        Task<IList<ContestWork>> GetSortedByWeldingType(string direction, int pageNumber, int rowsNumber);
    }
}
