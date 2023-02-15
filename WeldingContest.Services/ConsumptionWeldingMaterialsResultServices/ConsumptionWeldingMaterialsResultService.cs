using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Services.ConsumptionWeldingMaterialsServices
{
    public class ConsumptionWeldingMaterialsResultService : IConsumptionWeldingMaterialsResultService
    {
        private readonly WeldingContestContext weldingContestContext;

        public ConsumptionWeldingMaterialsResultService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<ConsumptionWeldingMaterialsResult> Create(ConsumptionWeldingMaterialsResult entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<ConsumptionWeldingMaterialsResult> Get(string id)
        {
            return await weldingContestContext.ConsumptionWeldingMaterialsResults.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<ConsumptionWeldingMaterialsResult>> GetAll()
        {
            return await weldingContestContext.ConsumptionWeldingMaterialsResults
                .OrderBy(_ => _.OverallMark)
                .ToListAsync();
        }

        public Task<IList<ConsumptionWeldingMaterialsResult>> GetRange(int pageNumber, int rowsNumber)
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

        public async Task<ConsumptionWeldingMaterialsResult> Update(ConsumptionWeldingMaterialsResult entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
