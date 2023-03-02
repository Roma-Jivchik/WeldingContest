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
                .OrderBy(_ => _.Contestant.RFID)
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

        public async Task<IList<ContestWork>> GetByContestTitleAsyncRange(string title, int pageNumber, int rowsNumber)
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
                .Where(_ => _.Contest.Name == title)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.Contestant.RFID)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetByContestantRFIDAsync(string RFID)
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
                .Where(_ => _.Contestant.RFID == RFID)
                .OrderBy(_ => _.Contestant.RFID)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetByContestantSurnameAsyncRange(string surname, int pageNumber, int rowsNumber)
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
                .Where(_ => _.Contestant.FullName.Contains(surname))
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.Contestant.RFID)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetByContestantCompanyAsyncRange(string company, int pageNumber, int rowsNumber)
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
                .Where(_ => _.Contestant.Company.Contains(company))
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.Contestant.RFID)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetByNominationTitleAsyncRange(string title, int pageNumber, int rowsNumber)
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
                .Where(_ => _.Nomination.Title.Contains(title))
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.Contestant.RFID)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetByWeldingTypeAsyncRange(string weldingType, int pageNumber, int rowsNumber)
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
                .Where(_ => _.Nomination.WeldingType.Contains(weldingType))
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.Contestant.RFID)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetBySampleTypeAsyncRange(string sampleType, int pageNumber, int rowsNumber)
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
               .Where(_ => _.Nomination.SampleType.Contains(sampleType))
               .Skip(rowsNumber * (pageNumber - 1))
               .Take(rowsNumber)
               .OrderBy(_ => _.Contestant.RFID)
               .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetByContestantID(string ID)
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
               .Where(_ => _.ContestantID == ID)
               .OrderBy(_ => _.Contestant.RFID)
               .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetRangeByContestName(int pageNumber, int rowsNumber)
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
               .OrderBy(_ => _.Contest.Name)
               .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetRangeByContestantSurname(int pageNumber, int rowsNumber)
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
               .OrderBy(_ => _.Contestant.FullName)
               .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetRangeByContestantCompany(int pageNumber, int rowsNumber)
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
               .OrderBy(_ => _.Contestant.Company)
               .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetRangeByNominationTitle(int pageNumber, int rowsNumber)
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
               .OrderBy(_ => _.Nomination.Title)
               .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetRangeBySampleType(int pageNumber, int rowsNumber)
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
               .OrderBy(_ => _.Nomination.SampleType)
               .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetRangeByWeldingType(int pageNumber, int rowsNumber)
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
               .OrderBy(_ => _.Nomination.WeldingType)
               .ToListAsync();
        }
    }
}
