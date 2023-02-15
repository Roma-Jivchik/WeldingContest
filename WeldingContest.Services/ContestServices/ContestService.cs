using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestMembers;
using WeldingContest.Services.Entities.ContestWorks;

namespace WeldingContest.Services.ContestServices
{
    public class ContestService : IContestService
    {
        private readonly WeldingContestContext weldingContestContext;

        public ContestService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<Contest> Create(Contest entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<Contest> Get(string id)
        {
            return await weldingContestContext.Contests.Include(_ => _.ContestWorks).FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<Contest>> GetAll()
        {
            return await weldingContestContext.Contests
                .OrderBy(_ => _.Name)
                .ToListAsync();
        }

        public async Task<Contest> GetByBeginDateAsync(string beginDate)
        {
            return await weldingContestContext.Contests.FirstOrDefaultAsync(_ => _.DateOfBegin.ToString() == beginDate);
        }

        public Task<IList<Contest>> GetRange(int pageNumber, int rowsNumber)
        {
            throw new NotImplementedException();
        }

        public async Task Remove(string id)
        {
            var forRemove = await Get(id);

            weldingContestContext.Contests.Remove(forRemove);

            await SaveChanges();
        }

        public async Task SaveChanges()
        {
            await weldingContestContext.SaveChangesAsync();
        }

        public async Task<Contest> Update(Contest entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
