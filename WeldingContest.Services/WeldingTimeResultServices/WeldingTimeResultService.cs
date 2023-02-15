using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.WeldingTimeResultServices
{
    public class WeldingTimeResultService : IWeldingTimeResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public WeldingTimeResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<WeldingTimeResult> Create(WeldingTimeResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<WeldingTimeResult> Get(string id)
        {
            return await weldingContestContext.WeldingTimeResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<WeldingTimeResult>> GetAll()
        {
            return await weldingContestContext.WeldingTimeResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<WeldingTimeResult>> GetRange(int pageNumber, int rowsNumber)
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

        public async Task<WeldingTimeResult> Update(WeldingTimeResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
