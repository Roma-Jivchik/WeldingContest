using System.Collections.Generic;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestMembers;

namespace WeldingContest.Services.ComissionMemberServices
{
    public interface IComissionMemberService : IServiceBase<ComissionMember>
    {
        Task<ComissionMember> GetComissionMemberBySurnameAsync(string surname);
        Task<IList<ContestComission>> GetComissionMembersByContestAsync(string contestID);
    }
}
