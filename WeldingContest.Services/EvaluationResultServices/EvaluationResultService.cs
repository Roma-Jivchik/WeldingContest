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
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.ContestWork.Contestant.RFID)
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
    }
}
