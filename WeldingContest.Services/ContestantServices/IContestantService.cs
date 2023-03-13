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
        Task<int> GetPagesNumberBySurname(string surname, int rowsNumber);
        Task<int> GetPagesNumberByCompany(string company, int rowsNumber);
        Task<int> GetPagesNumberByNomination(string nomination, int rowsNumber);
        Task<IList<Contestant>> GetSearchedBySurname(string surname, int pageNumber, int rowsNumber);
        Task<IList<Contestant>> GetSearchedByCompany(string company, int pageNumber, int rowsNumber);
        Task<IList<Contestant>> GetSearchedByNomination(string nomination, int pageNumber, int rowsNumber);
        Task<IList<Contestant>> GetSortedByRFID(string direction, int rowsNumber, int pageNumber);
        Task<IList<Contestant>> GetSortedByQR(string direction,  int rowsNumber, int pageNumber);
        Task<IList<Contestant>> GetSortedByCompany(string direction,  int rowsNumber, int pageNumber);
        Task<IList<Contestant>> GetSortedByFullName(string direction, int rowsNumber, int pageNumber);
    }
}
