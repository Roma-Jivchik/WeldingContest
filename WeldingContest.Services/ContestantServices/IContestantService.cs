using System.Collections.Generic;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestMembers;

namespace WeldingContest.Services.ContestantServices
{
    public interface IContestantService : IServiceBase<Contestant>
    {
        Task<int> GetPagesNumber(int rowsNumber);
        Task<Contestant> GetContestantBySurnameAsync(string surname);
        Task<Contestant> GetByRFIDAsync(string RFID);
        Task<Contestant> GetByQRAsync(string QR);
        Task<IList<Contestant>> GetBySurnameRangeAsync(string surname, int pageNumber, int rowsNumber);
        Task<IList<Contestant>> GetByCompanyRangeAsync(string company, int pageNumber, int rowsNumber);
        Task<IList<Contestant>> GetByContestWorksRangeAsync(string nomination, int pageNumber, int rowsNumber);
        Task<IList<Contestant>> GetAllByRFID(int rowsNumber, int pageNumber);
        Task<IList<Contestant>> GetAllByQR(int rowsNumber, int pageNumber);
        Task<IList<Contestant>> GetAllByCompany(int rowsNumber, int pageNumber);
    }
}
