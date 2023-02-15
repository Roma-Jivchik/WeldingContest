using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.ArmatureEvaluationResultServices
{
    public class ArmatureEvaluationResultService : IArmatureEvaluationResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public ArmatureEvaluationResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<ArmatureEvaluationResult> Create(ArmatureEvaluationResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<ArmatureEvaluationResult> Get(string id)
        {
            return await weldingContestContext.ArmatureEvaluationResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<ArmatureEvaluationResult>> GetAll()
        {
            return await weldingContestContext.ArmatureEvaluationResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<ArmatureEvaluationResult>> GetRange(int pageNumber, int rowsNumber)
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

        public async Task<ArmatureEvaluationResult> Update(ArmatureEvaluationResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
