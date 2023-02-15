using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.AssemblyKSSResultServices
{
    public class AssemblyKSSResultService : IAssemblyKSSResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public AssemblyKSSResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<AssemblyKSSResult> Create(AssemblyKSSResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<AssemblyKSSResult> Get(string id)
        {
            return await weldingContestContext.AssemblyKSSResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<AssemblyKSSResult>> GetAll()
        {
            return await weldingContestContext.AssemblyKSSResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<AssemblyKSSResult>> GetRange(int pageNumber, int rowsNumber)
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

        public async Task<AssemblyKSSResult> Update(AssemblyKSSResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
