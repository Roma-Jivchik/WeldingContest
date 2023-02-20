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
