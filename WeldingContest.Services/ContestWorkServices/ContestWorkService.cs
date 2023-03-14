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
            return await weldingContestContext.ContestWorks.CountAsync()/rowsNumber + 1;
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
                .OrderBy(_ => _.Contestant.RFID)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetRange(int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
                .OrderBy(_ => _.Contestant.RFID)
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
                .Where(_ => _.ContestID == contestID)
                .ToListAsync(); 
        }

        public async Task<IList<ContestWork>> GetRangeByContestID(string contestID, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
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

        public async Task<int> GetPagesNumberByContestTitle(string title, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Contest)
                .Where(_ => _.Contest.Name.Contains(title))
                .CountAsync() / rowsNumber + 1;
        }

        public async Task<int> GetPagesNumberByContestantSurname(string surname, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Contestant)
                .Where(_ => _.Contestant.FullName.Contains(surname))
                .CountAsync() / rowsNumber + 1;
        }

        public async Task<int> GetPagesNumberByContestantRFID(string RFID, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Contestant)
                .Where(_ => _.Contestant.RFID.Contains(RFID))
                .CountAsync() / rowsNumber + 1;
        }

        public async Task<int> GetPagesNumberByContestantCompany(string company, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Contestant)
                .Where(_ => _.Contestant.Company.Contains(company))
                .CountAsync() / rowsNumber + 1;
        }

        public async Task<int> GetPagesNumberByNominationTitle(string title, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Where(_ => _.Nomination.Title.Contains(title))
                .CountAsync() / rowsNumber + 1;
        }

        public async Task<int> GetPagesNumberByWeldingType(string weldingType, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Where(_ => _.Nomination.WeldingType.Contains(weldingType))
                .CountAsync() / rowsNumber + 1;
        }

        public async Task<int> GetPagesNumberBySampleType(string sampleType, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Where(_ => _.Nomination.SampleType.Contains(sampleType))
                .CountAsync() / rowsNumber + 1;
        }

        public async Task<IList<ContestWork>> GetSearchedByContestTitle(string title, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
                .Where(_ => _.Contest.Name.Contains(title))
                .OrderBy(_ => _.Contestant.RFID)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetSearchedByContestantRFID(string RFID, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
                .Where(_ => _.Contestant.RFID.Contains(RFID))
                .OrderBy(_ => _.Contestant.RFID)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetSearchedByContestantSurname(string surname, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
                .Where(_ => _.Contestant.FullName.Contains(surname))
                .OrderBy(_ => _.Contestant.RFID)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetSearchedByContestantCompany(string company, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
                .Where(_ => _.Contestant.Company.Contains(company))
                .OrderBy(_ => _.Contestant.RFID)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetSearchedByNominationTitle(string title, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
                .Where(_ => _.Nomination.Title.Contains(title))
                .OrderBy(_ => _.Contestant.RFID)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetSearchedByWeldingType(string weldingType, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
                .Include(_ => _.Nomination)
                .Include(_ => _.Contest)
                .Include(_ => _.Contestant)
                .Where(_ => _.Nomination.WeldingType.Contains(weldingType))
                .OrderBy(_ => _.Contestant.RFID)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetSearchedBySampleType(string sampleType, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.ContestWorks
               .Include(_ => _.Nomination)
               .Include(_ => _.Contest)
               .Include(_ => _.Contestant)
               .Where(_ => _.Nomination.SampleType.Contains(sampleType))
               .OrderBy(_ => _.Contestant.RFID)
               .Skip(rowsNumber * (pageNumber - 1))
               .Take(rowsNumber)
               .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetByContestantID(string ID)
        {
            return await weldingContestContext.ContestWorks
               .Include(_ => _.Nomination)
               .Include(_ => _.Contest)
               .Include(_ => _.Contestant)
               .Where(_ => _.ContestantID == ID)
               .OrderBy(_ => _.Contestant.RFID)
               .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetSortedByContestName(string direction, int pageNumber, int rowsNumber)
        {
            if (direction == "up")
            {
                return await weldingContestContext.ContestWorks
                   .Include(_ => _.Nomination)
                   .Include(_ => _.Contest)
                   .Include(_ => _.Contestant)
                   .OrderBy(_ => _.Contest.Name)
                   .Skip(rowsNumber * (pageNumber - 1))
                   .Take(rowsNumber)
                   .ToListAsync();
            }

            return await weldingContestContext.ContestWorks
                   .Include(_ => _.Nomination)
                   .Include(_ => _.Contest)
                   .Include(_ => _.Contestant)
                   .OrderByDescending(_ => _.Contest.Name)
                   .Skip(rowsNumber * (pageNumber - 1))
                   .Take(rowsNumber)
                   .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetSortedByContestantFullName(string direction, int pageNumber, int rowsNumber)
        {
            if (direction == "up")
            {
                return await weldingContestContext.ContestWorks
                   .Include(_ => _.Nomination)
                   .Include(_ => _.Contest)
                   .Include(_ => _.Contestant)
                   .OrderBy(_ => _.Contestant.FullName)
                   .Skip(rowsNumber * (pageNumber - 1))
                   .Take(rowsNumber)
                   .ToListAsync();
            }

            return await weldingContestContext.ContestWorks
                   .Include(_ => _.Nomination)
                   .Include(_ => _.Contest)
                   .Include(_ => _.Contestant)
                   .OrderByDescending(_ => _.Contestant.FullName)
                   .Skip(rowsNumber * (pageNumber - 1))
                   .Take(rowsNumber)
                   .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetSortedByContestantCompany(string direction, int pageNumber, int rowsNumber)
        {
            if (direction == "up")
            {
                return await weldingContestContext.ContestWorks
                   .Include(_ => _.Nomination)
                   .Include(_ => _.Contest)
                   .Include(_ => _.Contestant)
                   .OrderBy(_ => _.Contestant.Company)
                   .Skip(rowsNumber * (pageNumber - 1))
                   .Take(rowsNumber)
                   .ToListAsync();
            }

            return await weldingContestContext.ContestWorks
                   .Include(_ => _.Nomination)
                   .Include(_ => _.Contest)
                   .Include(_ => _.Contestant)
                   .OrderByDescending(_ => _.Contestant.Company)
                   .Skip(rowsNumber * (pageNumber - 1))
                   .Take(rowsNumber)
                   .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetSortedByNominationTitle(string direction, int pageNumber, int rowsNumber)
        {
            if (direction == "up")
            {
                return await weldingContestContext.ContestWorks
                   .Include(_ => _.Nomination)
                   .Include(_ => _.Contest)
                   .Include(_ => _.Contestant)
                   .OrderBy(_ => _.Nomination.Title)
                   .Skip(rowsNumber * (pageNumber - 1))
                   .Take(rowsNumber)
                   .ToListAsync();
            }

            return await weldingContestContext.ContestWorks
                   .Include(_ => _.Nomination)
                   .Include(_ => _.Contest)
                   .Include(_ => _.Contestant)
                   .OrderByDescending(_ => _.Nomination.Title)
                   .Skip(rowsNumber * (pageNumber - 1))
                   .Take(rowsNumber)
                   .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetSortedBySampleType(string direction, int pageNumber, int rowsNumber)
        {
            if (direction == "up")
            {
                return await weldingContestContext.ContestWorks
                   .Include(_ => _.Nomination)
                   .Include(_ => _.Contest)
                   .Include(_ => _.Contestant)
                   .OrderBy(_ => _.Nomination.SampleType)
                   .Skip(rowsNumber * (pageNumber - 1))
                   .Take(rowsNumber)
                   .ToListAsync();
            }

            return await weldingContestContext.ContestWorks
                   .Include(_ => _.Nomination)
                   .Include(_ => _.Contest)
                   .Include(_ => _.Contestant)
                   .OrderByDescending(_ => _.Nomination.SampleType)
                   .Skip(rowsNumber * (pageNumber - 1))
                   .Take(rowsNumber)
                   .ToListAsync();
        }

        public async Task<IList<ContestWork>> GetSortedByWeldingType(string direction, int pageNumber, int rowsNumber)
        {
            if (direction == "up")
            {
                return await weldingContestContext.ContestWorks
                   .Include(_ => _.Nomination)
                   .Include(_ => _.Contest)
                   .Include(_ => _.Contestant)
                   .OrderBy(_ => _.Nomination.WeldingType)
                   .Skip(rowsNumber * (pageNumber - 1))
                   .Take(rowsNumber)
                   .ToListAsync();
            }

            return await weldingContestContext.ContestWorks
                   .Include(_ => _.Nomination)
                   .Include(_ => _.Contest)
                   .Include(_ => _.Contestant)
                   .OrderByDescending(_ => _.Nomination.WeldingType)
                   .Skip(rowsNumber * (pageNumber - 1))
                   .Take(rowsNumber)
                   .ToListAsync();
        }
    }
}
