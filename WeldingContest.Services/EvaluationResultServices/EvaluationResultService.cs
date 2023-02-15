using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.EvaluationResultServices
{
    public class EvaluationResultService : IEvaluationResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public EvaluationResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<EvaluationResult> Create(EvaluationResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<EvaluationResult> Get(string id)
        {
            return await weldingContestContext.EvaluationResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<EvaluationResult>> GetAll()
        {
            return await weldingContestContext.EvaluationResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<EvaluationResult>> GetRange(int pageNumber, int rowsNumber)
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

        public async Task<EvaluationResult> Update(EvaluationResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
