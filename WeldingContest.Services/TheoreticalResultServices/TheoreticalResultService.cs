using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.TheoreticalResultServices
{
    public class TheoreticalResultService : ITheoreticalResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public TheoreticalResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<TheoreticalResult> Create(TheoreticalResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<TheoreticalResult> Get(string id)
        {
            return await weldingContestContext.TheoreticalResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<TheoreticalResult>> GetAll()
        {
            return await weldingContestContext.TheoreticalResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<TheoreticalResult>> GetRange(int pageNumber, int rowsNumber)
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

        public async Task<TheoreticalResult> Update(TheoreticalResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
