using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.VMCResultServices
{
    public class VMCResultService : IVMCResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public VMCResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<VMCResult> Create(VMCResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<VMCResult> Get(string id)
        {
            return await weldingContestContext.VMCResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<VMCResult>> GetAll()
        {
            return await weldingContestContext.VMCResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<VMCResult>> GetRange(int pageNumber, int rowsNumber)
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

        public async Task<VMCResult> Update(VMCResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}