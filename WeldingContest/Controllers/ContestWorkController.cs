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
        [Route("[controller]/get-pages-number/by-contestTitle")]
        public async Task<IActionResult> GetPagesNumberByContestTitle(string contestTitle, int rowsNumber)
        {
            try
            {
                var contestants = await _contestWorkService.GetPagesNumberByContestTitle(contestTitle, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-pages-number/by-contestantSurname")]
        public async Task<IActionResult> GetPagesNumberByContestantSurname(string contestantSurname, int rowsNumber)
        {
            try
            {
                var contestants = await _contestWorkService.GetPagesNumberByContestantSurname(contestantSurname, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-pages-number/by-contestantCompany")]
        public async Task<IActionResult> GetPagesNumberByContestantCompany(string contestantCompany, int rowsNumber)
        {
            try
            {
                var contestants = await _contestWorkService.GetPagesNumberByContestantCompany(contestantCompany, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-pages-number/by-nominationTitle")]
        public async Task<IActionResult> GetPagesNumberByNominationTitle(string nominationTitle, int rowsNumber)
        {
            try
            {
                var contestants = await _contestWorkService.GetPagesNumberByNominationTitle(nominationTitle, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-pages-number/by-weldingType")]
        public async Task<IActionResult> GetPagesNumberByWeldingType(string weldingType, int rowsNumber)
        {
            try
            {
                var contestants = await _contestWorkService.GetPagesNumberByWeldingType(weldingType, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-pages-number/by-sampleType")]
        public async Task<IActionResult> GetPagesNumberBySampleType(string sampleType, int rowsNumber)
        {
            try
            {
                var contestants = await _contestWorkService.GetPagesNumberBySampleType(sampleType, rowsNumber);

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
        [Route("[controller]")]
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
        [Route("[controller]/searched/by-contestTitle")]
        public async Task<IActionResult> GetSearchedByContestTitle(string contestTitle, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetSearchedByContestTitle(contestTitle, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/searched/by-contestantRFID")]
        public async Task<IActionResult> GetSearchedByContestantRFID(string contestantRFID, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetSearchedByContestantRFID(contestantRFID, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/searched/by-contestantSurname")]
        public async Task<IActionResult> GetSearchedByContestantSurname(string contestantSurname, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetSearchedByContestantSurname(contestantSurname, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/searched/by-contestantCompany")]
        public async Task<IActionResult> GetSearchedByContestantCompany(string contestantCompany, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetSearchedByContestantCompany(contestantCompany, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/searched/by-nominationTitle")]
        public async Task<IActionResult> GetSearchedByNominationTitle(string nominationTitle, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetSearchedByNominationTitle(nominationTitle, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/searched/by-weldingType")]
        public async Task<IActionResult> GetSearchedByWeldingType(string weldingType, int pageNumber, int rowsNumber)
        { 
            try
            {
                var contestWorks = await _contestWorkService.GetSearchedByWeldingType(weldingType, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/searched/by-sampleType")]
        public async Task<IActionResult> GetSearchedBySampleType(string sampleType, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetSearchedBySampleType(sampleType, pageNumber, rowsNumber);

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
        [Route("[controller]/sorted/by-contest-name")]
        public async Task<IActionResult> GetSortedByContestName(string direction, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetSortedByContestName(direction, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {   
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/sorted/by-contestant-full-name")]
        public async Task<IActionResult> GetSortedByContestantFullName(string direction, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetSortedByContestantFullName(direction, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/sorted/by-contestant-company")]
        public async Task<IActionResult> GetSortedByContestantCompany(string direction, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetSortedByContestantFullName(direction, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/sorted/by-nomination-title")]
        public async Task<IActionResult> GetSortedByNominationTitle(string direction, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetSortedByNominationTitle(direction, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/sorted/by-sample-type")]
        public async Task<IActionResult> GetSortedBySampleType(string direction, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetSortedBySampleType(direction, pageNumber, rowsNumber);

                return Ok(contestWorks);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/sorted/by-welding-type")]
        public async Task<IActionResult> GetSortedByWeldingType(string direction, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestWorks = await _contestWorkService.GetSortedByWeldingType(direction, pageNumber, rowsNumber);

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
