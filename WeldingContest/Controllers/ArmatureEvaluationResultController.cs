using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.ArmatureEvaluationResultServices;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class ArmatureEvaluationResultController : ControllerBase
    {
        private readonly IArmatureEvaluationResultService _armatureEvaluationResultService;

        public ArmatureEvaluationResultController(IArmatureEvaluationResultService armatureEvaluationResultService)
        {
            _armatureEvaluationResultService = armatureEvaluationResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var armatureEvaluationResults = await _armatureEvaluationResultService.GetAll();

                return Ok(armatureEvaluationResults);
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
                var contestants = await _armatureEvaluationResultService.Get(id);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(ArmatureEvaluationResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] ArmatureEvaluationResult armatureEvaluationResultForCreate)
        {
            try
            {
                if (armatureEvaluationResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _armatureEvaluationResultService.Create(armatureEvaluationResultForCreate);

                return Ok(armatureEvaluationResultForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(ArmatureEvaluationResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] ArmatureEvaluationResult armatureEvaluationResultForUpdate)
        {
            try
            {
                if (armatureEvaluationResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _armatureEvaluationResultService.Update(armatureEvaluationResultForUpdate);

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
                await _armatureEvaluationResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
