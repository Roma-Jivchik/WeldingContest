using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.ArmatureSafetyResultServices
{
    public class ArmatureSafetyResultService : IArmatureSafetyResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public ArmatureSafetyResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<ArmatureSafetyResult> Create(ArmatureSafetyResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<ArmatureSafetyResult> Get(string id)
        {
            return await weldingContestContext.ArmatureSafetyResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<ArmatureSafetyResult>> GetAll()
        {
            return await weldingContestContext.ArmatureSafetyResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<ArmatureSafetyResult>> GetRange(int pageNumber, int rowsNumber)
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

        public async Task<ArmatureSafetyResult> Update(ArmatureSafetyResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
