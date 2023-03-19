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

        public async Task<EvaluationResult> GetByContestantRFIDAsync(string RFID)
        {
            return await weldingContestContext.EvaluationResults
                .FirstOrDefaultAsync(_ => _.ContestWork.Contestant.RFID == RFID);
        }

        public async Task<IList<EvaluationResult>> GetRange(int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Include(_ => _.ContestWork)
                .ThenInclude(_ => _.Nomination)
                .Include(_ => _.ContestWork)
                .ThenInclude(_ => _.Contestant)
                .OrderByDescending(_ => _.OverallMark)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<int> GetPagesNumber(int rowsNumber)
        {
            return await weldingContestContext.EvaluationResults.CountAsync() / rowsNumber;
        }

        public async Task<IList<EvaluationResult>> GetRangeByContestantCompanyAsync(string company, int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Where(_ => _.ContestWork.Contestant.Company == company)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<EvaluationResult>> GetRangeByContestantSurnameAsync(string surname, int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Where(_ => _.ContestWork.Contestant.FullName.Contains(surname))
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<EvaluationResult>> GetRangeByContestTitleAsync(string title, int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Where(_ => _.ContestWork.Contest.Name.Contains(title))
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<EvaluationResult>> GetRangeByNominationTitleAsync(string title, int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Where(_ => _.ContestWork.Nomination.Title.Contains(title))
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<EvaluationResult>> GetRangeBySampleTypeAsync(string sampleType, int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Where(_ => _.ContestWork.Nomination.SampleType == sampleType)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<EvaluationResult>> GetRangeByWeldingTypeAsync(string weldingType, int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Where(_ => _.ContestWork.Nomination.WeldingType.Contains(weldingType))
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
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

        public async Task<IList<EvaluationResult>> GetRangeByContestTitle(int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.ContestWork.Contest.Name)
                .ToListAsync();
        }

        public async Task<IList<EvaluationResult>> GetRangeByContestantSurname(int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.ContestWork.Contestant.FullName)
                .ToListAsync();
        }

        public async Task<IList<EvaluationResult>> GetRangeByContestantCompany(int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.ContestWork.Contestant.Company)
                .ToListAsync();
        }

        public async Task<IList<EvaluationResult>> GetRangeByNominationTitle(int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.ContestWork.Nomination.Title)
                .ToListAsync();
        }

        public async Task<IList<EvaluationResult>> GetRangeByWeldingType(int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.ContestWork.Nomination.WeldingType)
                .ToListAsync();
        }

        public async Task<IList<EvaluationResult>> GetRangeBySampleType(int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.EvaluationResults
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.ContestWork.Nomination.SampleType)
                .ToListAsync();
        }

        public async Task<IList<EvaluationResult>> CreateAll()
        {
            var contestWorks = await weldingContestContext.ContestWorks
                .Include(_ => _.AssemblyKSSResults)
                .Include(_ => _.ConsumptionWeldingMaterialsResults)
                .Include(_ => _.MechanicalTestResults)
                .Include(_ => _.RGMResults)
                .Include(_ => _.SafetyResults)
                .Include(_ => _.TheoreticalResults)
                .Include(_ => _.VMCResults)
                .Include(_ => _.WeldingTimeResults)
                .Include(_ => _.EvaluationResults)
                .Where(_ => _.EvaluationResults.Count() == 0)
                .ToListAsync();

            foreach (var contestWork in contestWorks)
            {
                    var evaluationResult = new EvaluationResult();

                    evaluationResult.ID = Guid.NewGuid().ToString();
                    evaluationResult.ContestWorkID = contestWork.ID;

                    evaluationResult.AssemblyKSSMark = contestWork.AssemblyKSSResults.Count != 0 
                        ? contestWork.AssemblyKSSResults.ElementAt(0).OverallMark : 0;

                    evaluationResult.SafetyMark = contestWork.SafetyResults.Count != 0 
                        ? contestWork.SafetyResults.ElementAt(0).OverallMark : 0;

                    evaluationResult.WeldingTimeMark = contestWork.WeldingTimeResults.Count != 0 
                        ? contestWork.WeldingTimeResults.ElementAt(0).OverallMark : 0;

                    evaluationResult.ConsumptionWeldingMaterialsMark = contestWork.ConsumptionWeldingMaterialsResults.Count != 0 
                        ? contestWork.ConsumptionWeldingMaterialsResults.ElementAt(0).OverallMark : 0;

                    evaluationResult.VMCMark = contestWork.VMCResults.Count != 0 
                        ? contestWork.VMCResults.ElementAt(0).OverallMark : 0;

                    evaluationResult.RGMMark = contestWork.RGMResults.Count != 0 
                        ? contestWork.RGMResults.ElementAt(0).OverallMark : 0;

                    evaluationResult.TheoreticalMark = contestWork.TheoreticalResults.Count != 0 
                        ? contestWork.TheoreticalResults.ElementAt(0).OverallMark : 0;

                    evaluationResult.OverallMark = evaluationResult.AssemblyKSSMark + evaluationResult.SafetyMark
                        + evaluationResult.WeldingTimeMark + evaluationResult.ConsumptionWeldingMaterialsMark
                        + evaluationResult.VMCMark + evaluationResult.RGMMark + evaluationResult.TheoreticalMark;

                    await weldingContestContext.EvaluationResults.AddAsync(evaluationResult);
            }

            await SaveChanges();

            return await weldingContestContext.EvaluationResults.ToListAsync();
        }
    }
}
