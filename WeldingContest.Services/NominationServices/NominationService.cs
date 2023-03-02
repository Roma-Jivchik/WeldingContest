using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestWorks;

namespace WeldingContest.Services.NominationServices
{
    public class NominationService : INominationService
    {
        private readonly WeldingContestContext weldingContestContext;

        public NominationService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<Nomination> Create(Nomination entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.Nominations.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<Nomination> Get(string id)
        {
            return await weldingContestContext.Nominations.FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<Nomination>> GetAll()
        {
            return await weldingContestContext.Nominations
                .OrderBy(_ => _.Title)
                .ToListAsync();
        }

        public async Task<IList<Nomination>> GetAllBySampleType()
        {
            return await weldingContestContext.Nominations
               .OrderBy(_ => _.SampleType)
               .ToListAsync();
        }

        public async Task<IList<Nomination>> GetAllByWeldingType()
        {
            return await weldingContestContext.Nominations
               .OrderBy(_ => _.WeldingType)
               .ToListAsync();
        }

        public async Task<IList<Nomination>> GetByContestantIDRangeAsync(string ID, int rowsNumber, int pageNumber)
        {
            var contestWorks = await weldingContestContext.ContestWorks
                .Where(_ => _.ContestantID == ID)
                .ToListAsync();

            return await weldingContestContext.Nominations
                .Where(_ => _.ContestWorks == contestWorks)
                .Include(_ => _.ContestWorks)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.WeldingType)
                .ToListAsync();
        }

        public async Task<IList<Nomination>> GetBySampleTypeRangeAsync(string sampleType, int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.Nominations
                .Where(_ => _.SampleType == sampleType)
                .Include(_ => _.ContestWorks)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.WeldingType)
                .ToListAsync();
        }

        public async Task<Nomination> GetByTitleAsync(string title)
        {
            return await weldingContestContext.Nominations
                .FirstOrDefaultAsync(_ => _.Title.Contains(title));
        }

        public async Task<IList<Nomination>> GetByWeldingTypeRangeAsync(string weldingType, int rowsNumber, int pageNumber)
        {
            return await weldingContestContext.Nominations
               .Where(_ => _.WeldingType.Contains(weldingType))
               .Include(_ => _.ContestWorks)
               .Skip(rowsNumber * (pageNumber - 1))
               .Take(rowsNumber)
               .OrderBy(_ => _.SampleType)
               .ToListAsync();
        }

        public async Task<IList<Nomination>> GetRange(int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.Nominations
                .Skip(rowsNumber * pageNumber)
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task Remove(string id)
        {
            var forRemove = await Get(id);

            weldingContestContext.Nominations.Remove(forRemove);

            await SaveChanges();
        }

        public async Task SaveChanges()
        {
            await weldingContestContext.SaveChangesAsync();
        }

        public async Task<Nomination> Update(Nomination entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }
    }
}
