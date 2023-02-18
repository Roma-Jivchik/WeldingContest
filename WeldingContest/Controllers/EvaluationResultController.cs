using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestResults;
using WeldingContest.Services.EvaluationResultServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class EvaluationResultController : ControllerBase
    {
        private readonly IEvaluationResultService _evaluationResultService;

        public EvaluationResultController(IEvaluationResultService evaluationResultService)
        {
            _evaluationResultService = evaluationResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var evaluationResults = await _evaluationResultService.GetAll();

                return Ok(evaluationResults);
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
                var evaluationResults = await _evaluationResultService.GetRange(pageNumber, rowsNumber);

                return Ok(evaluationResults);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(EvaluationResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] EvaluationResult evaluationResultForCreate)
        {
            try
            {
                if (evaluationResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _evaluationResultService.Create(evaluationResultForCreate);

                return Ok(evaluationResultForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(EvaluationResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] EvaluationResult evaluationResultForUpdate)
        {
            try
            {
                if (evaluationResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _evaluationResultService.Update(evaluationResultForUpdate);

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
                await _evaluationResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
