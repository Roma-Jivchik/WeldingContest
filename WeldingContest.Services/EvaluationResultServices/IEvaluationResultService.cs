using System.Collections.Generic;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.EvaluationResultServices
{
    public interface IEvaluationResultService : IServiceBase<EvaluationResult>
    {
        Task<IList<EvaluationResult>> GetRangeByContestTitleAsync(string title, int rowsNumber, int pageNumber);
        Task<EvaluationResult> GetByContestantRFIDAsync(string RFID);
        Task<IList<EvaluationResult>> GetRangeByContestantSurnameAsync(string surname, int rowsNumber, int pageNumber);
        Task<IList<EvaluationResult>> GetRangeByContestantCompanyAsync(string company, int rowsNumber, int pageNumber);
        Task<IList<EvaluationResult>> GetRangeByNominationTitleAsync(string title, int rowsNumber, int pageNumber);
        Task<IList<EvaluationResult>> GetRangeByWeldingTypeAsync(string weldingType, int rowsNumber, int pageNumber);
        Task<IList<EvaluationResult>> GetRangeBySampleTypeAsync(string sampleType, int rowsNumber, int pageNumber);
        Task<int> GetPagesNumber(int rowsNumber);
        Task<IList<EvaluationResult>> GetRangeByContestTitle(int rowsNumber, int pageNumber);
        Task<IList<EvaluationResult>> GetRangeByContestantSurname(int rowsNumber, int pageNumber);
        Task<IList<EvaluationResult>> GetRangeByContestantCompany(int rowsNumber, int pageNumber);
        Task<IList<EvaluationResult>> GetRangeByNominationTitle(int rowsNumber, int pageNumber);
        Task<IList<EvaluationResult>> GetRangeByWeldingType(int rowsNumber, int pageNumber);
        Task<IList<EvaluationResult>> GetRangeBySampleType(int rowsNumber, int pageNumber);
    }
}
