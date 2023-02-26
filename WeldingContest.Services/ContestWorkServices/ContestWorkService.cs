using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestWorks;

namespace WeldingContest.Services.ContestWorkServices
{
    public class ContestWorkService : IContestWorkService
    {
        private readonly WeldingContestContext weldingContestContext;

        public ContestWorkService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<ContestWork> Create(ContestWork entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.ContestWorks.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<int> GetPagesNumber(int rowsNumber)
        {
            return await weldingContestContext.ContestWorks.CountAsync()/rowsNumber;
        }

        public async Task<ContestWork> Get(string id)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
                .Include(_ => _.ArmatureAssemblyKSSResults)
                .Include(_ => _.ArmatureEvaluationResults)
                .Include(_ => _.ArmatureSafetyResults)
                .Include(_ => _.ArmatureVMCResults)
                .Include(_ => _.AssemblyKSSResults)
                .Include(_ => _.ConsumptionWeldingMaterialsResults)
                .Include(_ => _.EvaluationResults)
                .Include(_ => _.MechanicalTestResults)
                .Include(_ => _.RGMResults)
                .Include(_ => _.SafetyResults)
                .Include(_ => _.TheoreticalResults)
                .Include(_ => _.VMCResults)
                .Include(_ => _.WeldingTimeResults)
                .FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<ContestWork>> GetAll()
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
                .Include(_ => _.ArmatureAssemblyKSSResults)
                .Include(_ => _.ArmatureEvaluationResults)
                .Include(_ => _.ArmatureSafetyResults)
                .Include(_ => _.ArmatureVMCResults)
                .Include(_ => _.AssemblyKSSResults)
                .Include(_ => _.ConsumptionWeldingMaterialsResults)
                .Include(_ => _.EvaluationResults)
                .Include(_ => _.MechanicalTestResults)
                .Include(_ => _.RGMResults)
                .Include(_ => _.SafetyResults)
                .Include(_ => _.TheoreticalResults)
                .Include(_ => _.VMCResults)
                .Include(_ => _.WeldingTimeResults)
                .OrderBy(_ => _.Contestant.RFID)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetRange(int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
                .Include(_ => _.ArmatureAssemblyKSSResults)
                .Include(_ => _.ArmatureEvaluationResults)
                .Include(_ => _.ArmatureSafetyResults)
                .Include(_ => _.ArmatureVMCResults)
                .Include(_ => _.AssemblyKSSResults)
                .Include(_ => _.ConsumptionWeldingMaterialsResults)
                .Include(_ => _.EvaluationResults)
                .Include(_ => _.MechanicalTestResults)
                .Include(_ => _.RGMResults)
                .Include(_ => _.SafetyResults)
                .Include(_ => _.TheoreticalResults)
                .Include(_ => _.VMCResults)
                .Include(_ => _.WeldingTimeResults)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetAllByContestID(string contestID)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
                .Include(_ => _.ArmatureAssemblyKSSResults)
                .Include(_ => _.ArmatureEvaluationResults)
                .Include(_ => _.ArmatureSafetyResults)
                .Include(_ => _.ArmatureVMCResults)
                .Include(_ => _.AssemblyKSSResults)
                .Include(_ => _.ConsumptionWeldingMaterialsResults)
                .Include(_ => _.EvaluationResults)
                .Include(_ => _.MechanicalTestResults)
                .Include(_ => _.RGMResults)
                .Include(_ => _.SafetyResults)
                .Include(_ => _.TheoreticalResults)
                .Include(_ => _.VMCResults)
                .Include(_ => _.WeldingTimeResults)
                .Where(_ => _.ContestID == contestID)
                .ToListAsync(); 
        }

        public async Task<IList<ContestWork>> GetRangeByContestID(string contestID, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
                .Include(_ => _.ArmatureAssemblyKSSResults)
                .Include(_ => _.ArmatureEvaluationResults)
                .Include(_ => _.ArmatureSafetyResults)
                .Include(_ => _.ArmatureVMCResults)
                .Include(_ => _.AssemblyKSSResults)
                .Include(_ => _.ConsumptionWeldingMaterialsResults)
                .Include(_ => _.EvaluationResults)
                .Include(_ => _.MechanicalTestResults)
                .Include(_ => _.RGMResults)
                .Include(_ => _.SafetyResults)
                .Include(_ => _.TheoreticalResults)
                .Include(_ => _.VMCResults)
                .Include(_ => _.WeldingTimeResults)
                .Where(_ => _.ContestID == contestID)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task Remove(string id)
        {
            var forRemove = await Get(id);

            weldingContestContext.ContestWorks.Remove(forRemove);

            await SaveChanges();
        }

        public async Task SaveChanges()
        {
            await weldingContestContext.SaveChangesAsync();
        }

        public async Task<ContestWork> Update(ContestWork entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
