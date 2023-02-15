using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.ArmatureAssemblyKSSResultServices
{
    public class ArmatureAssemblyKSSResultService : IArmatureAssemblyKSSResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public ArmatureAssemblyKSSResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<ArmatureAssemblyKSSResult> Create(ArmatureAssemblyKSSResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<ArmatureAssemblyKSSResult> Get(string id)
        {
            return await weldingContestContext.ArmatureAssemblyKSSResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<ArmatureAssemblyKSSResult>> GetAll()
        {
            return await weldingContestContext.ArmatureAssemblyKSSResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<ArmatureAssemblyKSSResult>> GetRange(int pageNumber, int rowsNumber)
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

        public async Task<ArmatureAssemblyKSSResult> Update(ArmatureAssemblyKSSResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
