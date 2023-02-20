using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestResults;
using WeldingContest.Services.SafetyResultServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class SafetyResultController : ControllerBase
    {
        private readonly ISafetyResultService _SafetyResultService;

        public SafetyResultController(ISafetyResultService SafetyResultService)
        {
            _SafetyResultService = SafetyResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var SafetyResults = await _SafetyResultService.GetAll();

                return Ok(SafetyResults);
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
                var contestants = await _SafetyResultService.Get(id);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        private IActionResult StatusCode(int v1, string v2)
        {
            throw new NotImplementedException();
        }

        [HttpGet]
        [Route("[controller]/get-range")]
        public async Task<IActionResult> GetRange(int pageNumber, int rowsNumber)
        {
            try
            {
                var SafetyResults = await _SafetyResultService.GetRange(pageNumber, rowsNumber);

                return Ok(SafetyResults);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(SafetyResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] SafetyResult SafetyResultForCreate)
        {
            try
            {
                if (SafetyResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _SafetyResultService.Create(SafetyResultForCreate);

                return Ok(SafetyResultForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(SafetyResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] SafetyResult SafetyResultForUpdate)
        {
            try
            {
                if (SafetyResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _SafetyResultService.Update(SafetyResultForUpdate);

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
                await _SafetyResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
