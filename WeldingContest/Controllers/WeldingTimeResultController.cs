using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestResults;
using WeldingContest.Services.WeldingTimeResultServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class WeldingTimeResultController : ControllerBase
    {
        private readonly IWeldingTimeResultService _WeldingTimeResultService;

        public WeldingTimeResultController(IWeldingTimeResultService WeldingTimeResultService)
        {
            _WeldingTimeResultService = WeldingTimeResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var WeldingTimeResults = await _WeldingTimeResultService.GetAll();

                return Ok(WeldingTimeResults);
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
                var WeldingTimeResults = await _WeldingTimeResultService.GetRange(pageNumber, rowsNumber);

                return Ok(WeldingTimeResults);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(WeldingTimeResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] WeldingTimeResult WeldingTimeResultForCreate)
        {
            try
            {
                if (WeldingTimeResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _WeldingTimeResultService.Create(WeldingTimeResultForCreate);

                return Ok(WeldingTimeResultForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(WeldingTimeResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] WeldingTimeResult WeldingTimeResultForUpdate)
        {
            try
            {
                if (WeldingTimeResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _WeldingTimeResultService.Update(WeldingTimeResultForUpdate);

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
                await _WeldingTimeResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
