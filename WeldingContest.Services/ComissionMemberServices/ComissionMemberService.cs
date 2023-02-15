using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestMembers;
using WeldingContest.DataAccess;
using Microsoft.EntityFrameworkCore;

namespace WeldingContest.Services.ComissionMemberServices
{
    public class ComissionMemberService : IComissionMemberService
    {
        private readonly WeldingContestContext weldingContestContext;

        public ComissionMemberService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<IList<ComissionMember>> GetRange(int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.ComissionMembers
                .Skip(rowsNumber * pageNumber)
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<ComissionMember> Create(ComissionMember entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<ComissionMember> Get(string id)
        {
            return await weldingContestContext.ComissionMembers.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<ComissionMember>> GetAll()
        {
            return await weldingContestContext.ComissionMembers
                .OrderBy(_ => _.FullName)
                .ToListAsync();
        }

        public async Task<ComissionMember> GetComissionMemberBySurnameAsync(string surname)
        {
            return await weldingContestContext.ComissionMembers.FirstOrDefaultAsync(_ => _.FullName.Contains(surname));
        }

        public async Task<IList<ContestComission>> GetComissionMembersByContestAsync(string contestID)
        {
            return await weldingContestContext.ContestComissions
                .Where(_ => _.ContestID == contestID)
                .OrderBy(_ => _.ComissionMember.FullName)
                .ToListAsync();
        }

        public async Task Remove(string id)
        {
            var forRemove = await Get(id);

            weldingContestContext.ComissionMembers.Remove(forRemove);

            await SaveChanges();
        }

        public async Task SaveChanges()
        {
            await weldingContestContext.SaveChangesAsync();
        }

        public async Task<ComissionMember> Update(ComissionMember entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
