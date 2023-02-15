using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.MechanicalTestResultServices
{
    public class MechanicalTestResultService : IMechanicalTestResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public MechanicalTestResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<MechanicalTestResult> Create(MechanicalTestResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<MechanicalTestResult> Get(string id)
        {
            return await weldingContestContext.MechanicalTestResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<MechanicalTestResult>> GetAll()
        {
            return await weldingContestContext.MechanicalTestResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<MechanicalTestResult>> GetRange(int pageNumber, int rowsNumber)
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

        public async Task<MechanicalTestResult> Update(MechanicalTestResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
