using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.SafetyResultServices
{
    public class SafetyResultService : ISafetyResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public SafetyResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<SafetyResult> Create(SafetyResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<SafetyResult> Get(string id)
        {
            return await weldingContestContext.SafetyResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<SafetyResult>> GetAll()
        {
            return await weldingContestContext.SafetyResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<SafetyResult>> GetRange(int pageNumber, int rowsNumber)
        {
            throw new NotImplementedException();
        }

        public async Task Remove(string id)
        {
            var forRemove = await Get(id);

            weldingContestContext.Remove(forRemove);

            await SaveChanges();
        }

        public async Task SaveChanges()
        {
            await weldingContestContext.SaveChangesAsync();
        }

        public async Task<SafetyResult> Update(SafetyResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
