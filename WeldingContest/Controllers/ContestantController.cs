using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.ContestantServices;
using WeldingContest.Services.Entities.ContestMembers;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class ContestantController : ControllerBase
    {
        private readonly IContestantService _contestantService;

        public ContestantController(IContestantService contestantService)
        {
            _contestantService = contestantService;
        }

        [HttpGet]
        [Route("[controller]/get-pages-number")]
        public async Task<IActionResult> GetPagesNumber(int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetPagesNumber(rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-pages-number/by-surname")]
        public async Task<IActionResult> GetPagesNumberBySurname(string surname,int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetPagesNumberBySurname(surname, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-pages-number/by-company")]
        public async Task<IActionResult> GetPagesNumberByCompany(string company, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetPagesNumberByCompany(company, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-pages-number/by-nomination")]
        public async Task<IActionResult> GetPagesNumberByNomination(string nomination, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetPagesNumberByNomination(nomination, rowsNumber);

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
                var contestants = await _contestantService.Get(id);

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
                var contestants = await _contestantService.GetRange(pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/sorted/by-rfid")]
        public async Task<IActionResult> GetSortedByRFID(string direction, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetSortedByRFID(direction, pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/sorted/by-qr")]
        public async Task<IActionResult> GetSortedByQR(string direction, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetSortedByQR(direction, pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/sorted/by-company")]
        public async Task<IActionResult> GetSortedByCompany(string direction, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetSortedByCompany(direction, pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
        [HttpGet]
        [Route("[controller]/sorted/by-full-name")]
        public async Task<IActionResult> GetSortedByFullName(string direction, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetSortedByFullName(direction, pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/searched/by-surname")]
        public async Task<IActionResult> GetSearchedBySurname(string surname, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetSearchedBySurname(surname, pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/searched/by-company")]
        public async Task<IActionResult> GetSearchedByCompany(string company, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetSearchedByCompany(company, pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/searched/by-nomination")]
        public async Task<IActionResult> GetSearchedByNomination(string nomination, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetSearchedByNomination(nomination, pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/searched/by-qr")]
        public async Task<IActionResult> GetByQR(string QR)
        {
            try
            {
                var contestants = await _contestantService.GetByQRAsync(QR);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/searched/by-rfid")]
        public async Task<IActionResult> GetByRFID(string RFID)
        {
            try
            {
                var contestants = await _contestantService.GetByRFIDAsync(RFID);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(Contestant), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] Contestant contestantForCreate)
        {
            try
            {
                if (contestantForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _contestantService.Create(contestantForCreate);

                return Ok(contestantForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(Contestant), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] Contestant contestantForUpdate)
        {
            try
            {
                if (contestantForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _contestantService.Update(contestantForUpdate);

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
                await _contestantService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
