using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestMembers;

namespace WeldingContest.Services.ContestantServices
{
    public interface IContestantService : IServiceBase<Contestant>
    {
        Task<Contestant> GetContestantBySurnameAsync(string surname);
        Task<Contestant> GetByRFIDAsync(string RFID);
        Task<Contestant> GetByQRAsync(string QR);
    }
}
