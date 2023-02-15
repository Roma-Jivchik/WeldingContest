using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.ArmatureVMCServices;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.ArmatureVMCResultServices
{
    public class ArmatureVMCResultService : IArmatureVMCResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public ArmatureVMCResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<ArmatureVMCResult> Create(ArmatureVMCResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<ArmatureVMCResult> Get(string id)
        {
            return await weldingContestContext.ArmatureVMCResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<ArmatureVMCResult>> GetAll()
        {
            return await weldingContestContext.ArmatureVMCResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<ArmatureVMCResult>> GetRange(int pageNumber, int rowsNumber)
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

        public async Task<ArmatureVMCResult> Update(ArmatureVMCResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
