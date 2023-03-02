using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.ContestWorkServices;
using WeldingContest.Services.Entities.ContestWorks;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class ContestWorkController : ControllerBase
    {
        private readonly IContestWorkService _contestWorkService;

        public ContestWorkController(IContestWorkService contestWorkService)
        {
            _contestWorkService = contestWorkService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var contestWorks = await _contestWorkService.GetAll();

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-pages-number")]
        public async Task<IActionResult> GetPagesNumber(int rowsNumber)
        {
            try
            {
                var contestants = await _contestWorkService.GetPagesNumber(rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-id")]
        public async Task<IActionResult> GetByID(string id)
        {
            try
            {
                var contestants = await _contestWorkService.Get(id);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range")]
        public async Task<IActionResult> GetRange(int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetRange(pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-contest-title")]
        public async Task<IActionResult> GetRangeByContestTitle(int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetRangeByContestName(pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-contestant-surname")]
        public async Task<IActionResult> GetRangeByContestantSurname(int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetRangeByContestantSurname(pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-contestant-company")]
        public async Task<IActionResult> GetRangeByContestantCompany(int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetRangeByContestantCompany(pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-nomination-title")]
        public async Task<IActionResult> GetRangeByNominationTitle(int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetRangeByNominationTitle(pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-welding-type")]
        public async Task<IActionResult> GetRangeByWeldingType(int pageNumber, int rowsNumber)
        { 
            try
            {
                var contestWorks = await _contestWorkService.GetRangeByWeldingType(pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-sample-type")]
        public async Task<IActionResult> GetRangeBySampleType(int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetRangeBySampleType(pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-all-by-contest-id")]
        public async Task<IActionResult> GetAllByContestID(string contestID)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetAllByContestID(contestID);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-contest-id")]
        public async Task<IActionResult> GetRangeByContestID(string contestID, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetRangeByContestID(contestID, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {   
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-contest-title")]
        public async Task<IActionResult> GetRangeByContestTitle(string title, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetByContestTitleAsyncRange(title, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-contestant-rfid")]
        public async Task<IActionResult> GetByContestantRFID(string RFID)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetByContestantRFIDAsync(RFID);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-contestant-surname")]
        public async Task<IActionResult> GetRangeByContestantCompany(string company, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetByContestantCompanyAsyncRange(company, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-contestant-surname")]
        public async Task<IActionResult> GetRangeByNominationTitle(string title, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetByNominationTitleAsyncRange(title, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-welding-type")]
        public async Task<IActionResult> GetRangeByWeldingType(string weldingType, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetByWeldingTypeAsyncRange(weldingType, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-sample-type")]
        public async Task<IActionResult> GetRangeBySampleType(string sampleType, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetBySampleTypeAsyncRange(sampleType, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-contestant-id")]
        public async Task<IActionResult> GetByContestantID(string ID)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetAllByContestID(ID);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-contestant-surname")]
        public async Task<IActionResult> GetRangeByContestantSurname(string surname, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetByContestantSurnameAsyncRange(surname, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(ContestWork), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] ContestWork contestWorkForCreate)
        {
            try
            {
                if (contestWorkForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _contestWorkService.Create(contestWorkForCreate);

                return Ok(contestWorkForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(ContestWork), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] ContestWork contestWorkForUpdate)
        {
            try
            {
                if (contestWorkForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _contestWorkService.Update(contestWorkForUpdate);

                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpDelete]
        [Route("[controller]/delete")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        public async Task<IActionResult> Delete([FromBody] string RFID)
        {
            try
            {
                await _contestWorkService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
