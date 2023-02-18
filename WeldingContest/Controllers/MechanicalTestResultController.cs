using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestResults;
using WeldingContest.Services.MechanicalTestResultServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class MechanicalTestResultController : ControllerBase
    {
        private readonly IMechanicalTestResultService _mechanicalTestResultService;

        public MechanicalTestResultController(IMechanicalTestResultService mechanicalTestResultService)
        {
            _mechanicalTestResultService = mechanicalTestResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var mechanicalTestResults = await _mechanicalTestResultService.GetAll();

                return Ok(mechanicalTestResults);
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
                var mechanicalTestResults = await _mechanicalTestResultService.GetRange(pageNumber, rowsNumber);

                return Ok(mechanicalTestResults);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(MechanicalTestResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] MechanicalTestResult mechanicalTestResultForCreate)
        {
            try
            {
                if (mechanicalTestResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _mechanicalTestResultService.Create(mechanicalTestResultForCreate);

                return Ok(mechanicalTestResultForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(MechanicalTestResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] MechanicalTestResult mechanicalTestResultForUpdate)
        {
            try
            {
                if (mechanicalTestResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _mechanicalTestResultService.Update(mechanicalTestResultForUpdate);

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
                await _mechanicalTestResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
