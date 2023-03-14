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
            return await weldingContestContext.Contestants.CountAsync()/rowsNumber + 1;
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

        public async Task<int> GetPagesNumberBySurname(string surname, int rowsNumber)
        {
            return await weldingContestContext.Contestants
                .Where(_ => _.FullName.Contains(surname))
                .CountAsync() / rowsNumber + 1;
        }

        public async Task<int> GetPagesNumberByRFID(string RFID, int rowsNumber)
        {
            return await weldingContestContext.Contestants
                .Where(_ => _.RFID.Contains(RFID))
                .CountAsync() / rowsNumber + 1;
        }

        public async Task<int> GetPagesNumberByCompany(string company, int rowsNumber)
        {
            return await weldingContestContext.Contestants
                .Where(_ => _.Company.Contains(company))
                .CountAsync() / rowsNumber + 1;
        }

        public async Task<int> GetPagesNumberByNomination(string nomination, int rowsNumber)
        {
            return await weldingContestContext.Contestants
                .Include(_ => _.ContestWorks)
                .Where(_ => _.ContestWorks.Where(_ => _.Nomination.Title.Contains(nomination)).Count() != 0)
                .CountAsync() / rowsNumber + 1;
        }

        public async Task<IList<Contestant>> GetSearchedBySurname(string surname, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.Contestants
                .Where(_ => _.FullName.Contains(surname))
                .OrderBy(_ => _.FullName)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .Include(_ => _.ContestWorks)
                .ToListAsync();
        }

        public async Task<IList<Contestant>> GetSearchedByRFID(string RFID, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.Contestants
                .Where(_ => _.RFID.Contains(RFID))
                .OrderBy(_ => _.FullName)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .Include(_ => _.ContestWorks)
                .ToListAsync();
        }

        public async Task<IList<Contestant>> GetSearchedByCompany(string company, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.Contestants
               .Where(_ => _.Company.Contains(company))
               .OrderBy(_ => _.FullName)
               .Skip(rowsNumber * (pageNumber - 1))
               .Take(rowsNumber)
               .Include(_ => _.ContestWorks)
               .ToListAsync();
        }

        public async Task<IList<Contestant>> GetSearchedByNomination(string nomination, int pageNumber, int rowsNumber)
        {
            return await weldingContestContext.Contestants
               .Include(_ => _.ContestWorks)
               .Where(_ => _.ContestWorks.Where(_ => _.Nomination.Title.Contains(nomination)).Count() != 0)
               .OrderBy(_ => _.FullName)
               .Skip(rowsNumber * (pageNumber - 1))
               .Take(rowsNumber)
               .ToListAsync();
        }

        public async Task<IList<Contestant>> GetSortedByRFID(string direction, int pageNumber, int rowsNumber)
        {
            if (direction == "up")
            {
                return await weldingContestContext.Contestants
                    .OrderBy(_ => _.RFID)
                    .Skip(rowsNumber * (pageNumber - 1))
                    .Take(rowsNumber)
                    .ToListAsync();
            }

            return await weldingContestContext.Contestants
                .OrderByDescending(_ => _.RFID)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<Contestant>> GetSortedByQR(string direction, int pageNumber, int rowsNumber)
        {
            if (direction == "up")
            {
                return await weldingContestContext.Contestants
                    .OrderBy(_ => _.QR)
                    .Skip(rowsNumber * (pageNumber - 1))
                    .Take(rowsNumber)
                    .ToListAsync();
            }

            return await weldingContestContext.Contestants
                .OrderByDescending(_ => _.QR)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<Contestant>> GetSortedByCompany(string direction, int pageNumber, int rowsNumber)
        {
            if (direction == "up")
            {
                return await weldingContestContext.Contestants
                    .OrderBy(_ => _.Company)
                    .Skip(rowsNumber * (pageNumber - 1))
                    .Take(rowsNumber)
                    .ToListAsync();
            }

            return await weldingContestContext.Contestants
                .OrderByDescending(_ => _.Company)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }

        public async Task<IList<Contestant>> GetSortedByFullName(string direction, int pageNumber, int rowsNumber)
        {
            if (direction == "up")
            {
                return await weldingContestContext.Contestants
                    .OrderBy(_ => _.FullName)
                    .Skip(rowsNumber * (pageNumber - 1))
                    .Take(rowsNumber)
                    .ToListAsync();
            }

            return await weldingContestContext.Contestants
                .OrderByDescending(_ => _.FullName)
                .Skip(rowsNumber * (pageNumber - 1))
                .Take(rowsNumber)
                .ToListAsync();
        }
    }
}
