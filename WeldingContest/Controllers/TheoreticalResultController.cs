using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestResults;
using WeldingContest.Services.TheoreticalResultServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class TheoreticalResultController : ControllerBase
    {
        private readonly ITheoreticalResultService _TheoreticalResultService;

        public TheoreticalResultController(ITheoreticalResultService TheoreticalResultService)
        {
            _TheoreticalResultService = TheoreticalResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var TheoreticalResults = await _TheoreticalResultService.GetAll();

                return Ok(TheoreticalResults);
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
                var contestants = await _TheoreticalResultService.Get(id);

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
                var TheoreticalResults = await _TheoreticalResultService.GetRange(pageNumber, rowsNumber);

                return Ok(TheoreticalResults);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(TheoreticalResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] TheoreticalResult TheoreticalResultForCreate)
        {
            try
            {
                if (TheoreticalResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _TheoreticalResultService.Create(TheoreticalResultForCreate);

                return Ok(TheoreticalResultForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(TheoreticalResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] TheoreticalResult TheoreticalResultForUpdate)
        {
            try
            {
                if (TheoreticalResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _TheoreticalResultService.Update(TheoreticalResultForUpdate);

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
                await _TheoreticalResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
