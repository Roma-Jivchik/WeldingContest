using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestWorks;
using WeldingContest.Services.NominationServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class NominationController : ControllerBase
    {
        private readonly INominationService _nominationService;

        public NominationController(INominationService nominationService)
        {
            _nominationService = nominationService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var nominations = await _nominationService.GetAll();

                return Ok(nominations);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-all-by-sample-type")]
        public async Task<IActionResult> GetAllBySampleType()
        {
            try
            {
                var nominations = await _nominationService.GetAllBySampleType();

                return Ok(nominations);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-all-by-welding-type")]
        public async Task<IActionResult> GetAllByWeldingType()
        {
            try
            {
                var nominations = await _nominationService.GetAllByWeldingType();

                return Ok(nominations);
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
                var contestants = await _nominationService.Get(id);

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
                var nominations = await _nominationService.GetRange(pageNumber, rowsNumber);

                return Ok(nominations);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-contestant-id-range")]
        public async Task<IActionResult> GetByContestantIDRange(string ID, int pageNumber, int rowsNumber)
        {
            try
            {
                var nominations = await _nominationService.GetByContestantIDRangeAsync(ID, pageNumber, rowsNumber);

                return Ok(nominations);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-sample-type-range")]
        public async Task<IActionResult> GetBySampleTypeRange(string sampleType, int pageNumber, int rowsNumber)
        {
            try
            {
                var nominations = await _nominationService.GetBySampleTypeRangeAsync(sampleType, pageNumber, rowsNumber);

                return Ok(nominations);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-welding-type-range")]
        public async Task<IActionResult> GetByWeldingTypeRange(string weldingType, int pageNumber, int rowsNumber)
        {
            try
            {
                var nominations = await _nominationService.GetByWeldingTypeRangeAsync(weldingType, pageNumber, rowsNumber);

                return Ok(nominations);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by title")]
        public async Task<IActionResult> GetByTitle(string title)
        {
            try
            {
                var nominations = await _nominationService.GetByTitleAsync(title);

                return Ok(nominations);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(Nomination), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] Nomination nominationForCreate)
        {
            try
            {
                if (nominationForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _nominationService.Create(nominationForCreate);

                return Ok(nominationForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(Nomination), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] Nomination nominationForUpdate)
        {
            try
            {
                if (nominationForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _nominationService.Update(nominationForUpdate);

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
                await _nominationService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
