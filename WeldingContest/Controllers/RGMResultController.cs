using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestResults;
using WeldingContest.Services.RGMResultServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class RGMResultController : ControllerBase
    {
        private readonly IRGMResultService _RGMResultService;

        public RGMResultController(IRGMResultService RGMResultService)
        {
            _RGMResultService = RGMResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var RGMResults = await _RGMResultService.GetAll();

                return Ok(RGMResults);
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
                var contestants = await _RGMResultService.Get(id);

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
                var RGMResults = await _RGMResultService.GetRange(pageNumber, rowsNumber);

                return Ok(RGMResults);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(RGMResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] RGMResult RGMResultForCreate)
        {
            try
            {
                if (RGMResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _RGMResultService.Create(RGMResultForCreate);

                return Ok(RGMResultForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(RGMResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] RGMResult RGMResultForUpdate)
        {
            try
            {
                if (RGMResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _RGMResultService.Update(RGMResultForUpdate);

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
                await _RGMResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
