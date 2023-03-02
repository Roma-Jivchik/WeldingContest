using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.DataAccess;
using WeldingContest.Services.Entities.ContestMembers;

namespace WeldingContest.Services.ContestantServices
{
    public class ContestantService : IContestantService
    {
        private readonly WeldingContestContext weldingContestContext;

        public ContestantService(WeldingContestContext weldingContestContext)
        {
            this.weldingContestContext = weldingContestContext;
        }

        public async Task<Contestant> Create(Contestant entity)
        {
            entity.ID = Guid.NewGuid().ToString();

            await weldingContestContext.AddAsync(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<int> GetPagesNumber(int rowsNumber)
        {
            return await weldingContestContext.Contestants.CountAsync()/rowsNumber;
        }

        public async Task<Contestant> Get(string id)
        {
            return await weldingContestContext.Contestants.Include(_ => _.ContestWorks).FirstOrDefaultAsync(_ => _.ID == id);
        }

        public async Task<IList<Contestant>> GetAll()
        {
            return await weldingContestContext.Contestants
                .OrderBy(_ => _.FullName)
                .ToListAsync();
        }

        public async Task<Contestant> GetByQRAsync(string QR)
        {
            return await weldingContestContext.Contestants.FirstOrDefaultAsync(_ => _.QR == QR);
        }

        public async Task<Contestant> GetByRFIDAsync(string RFID)
        {
            return await weldingContestContext.Contestants.FirstOrDefaultAsync(_ => _.RFID == RFID);
        }

        public async Task<Contestant> GetContestantBySurnameAsync(string surname)
        {
            return await weldingContestContext.Contestants.FirstOrDefaultAsync(_ => _.FullName.Contains(surname));
        }

        public async Task<IList<Contestant>> GetRange(int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.Contestants
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .Include(_ => _.ContestWorks)
                .ToListAsync();
        }

        public async Task Remove(string id)
        {
            var forRemove = await Get(id);

            weldingContestContext.Contestants.Remove(forRemove);

            await SaveChanges();
        }

        public async Task SaveChanges()
        {
            await weldingContestContext.SaveChangesAsync();
        }

        public async Task<Contestant> Update(Contestant entity)
        {
            await Remove(entity.ID);

            await Create(entity);

            await SaveChanges();

            return entity;
        }

        public async Task<IList<Contestant>> GetBySurnameRangeAsync(string surname, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.Contestants
                .Where(_ => _.FullName.Contains(surname))
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .Include(_ => _.ContestWorks)
                .OrderBy(_ => _.FullName)
                .ToListAsync();
        }

        public async Task<IList<Contestant>> GetByCompanyRangeAsync(string company, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.Contestants
               .Where(_ => _.Company == company)
               .Skip(rowsNumber * (pageNumber - 1))
               .Take(rowsNumber)
               .Include(_ => _.ContestWorks)
               .OrderBy(_ => _.FullName)
               .ToListAsync();
        }

        public async Task<IList<Contestant>> GetByContestWorksRangeAsync(string nomination, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.Contestants
               .Where(_ => _.ContestWorks.FirstOrDefault(_ => _.Nomination.Title != nomination).Nomination.Title != nomination)
               .Skip(rowsNumber * (pageNumber - 1))
               .Take(rowsNumber)
               .Include(_ => _.ContestWorks)
               .OrderBy(_ => _.FullName)
               .ToListAsync();
        }

        public async Task<IList<Contestant>> GetAllByRFID(int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.Contestants
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.RFID)
                .ToListAsync();
        }

        public async Task<IList<Contestant>> GetAllByQR(int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.Contestants
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.QR)
                .ToListAsync();
        }

        public async Task<IList<Contestant>> GetAllByCompany(int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.Contestants
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .OrderBy(_ => _.Company)
                .ToListAsync();
        }
    }
}
