using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.RGMResultServices
{
    public class RGMResultService : IRGMResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public RGMResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<RGMResult> Create(RGMResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<RGMResult> Get(string id)
        {
            return await weldingContestContext.RGMResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<RGMResult>> GetAll()
        {
            return await weldingContestContext.RGMResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<RGMResult>> GetRange(int pageNumber, int rowsNumber)
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

        public async Task<RGMResult> Update(RGMResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
