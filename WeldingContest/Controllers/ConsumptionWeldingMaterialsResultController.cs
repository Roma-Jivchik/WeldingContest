using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.ConsumptionWeldingMaterialsServices;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class ConsumptionWeldingMaterialsResultController : ControllerBase
    {
        private readonly IConsumptionWeldingMaterialsResultService _armatureSafetyResultService;

        public ConsumptionWeldingMaterialsResultController(IConsumptionWeldingMaterialsResultService armatureSafetyResultService)
        {
            _armatureSafetyResultService = armatureSafetyResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var armatureSafetyResults = await _armatureSafetyResultService.GetAll();

                return Ok(armatureSafetyResults);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(ConsumptionWeldingMaterialsResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] ConsumptionWeldingMaterialsResult armatureSafetyResultForCreate)
        {
            try
            {
                if (armatureSafetyResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _armatureSafetyResultService.Create(armatureSafetyResultForCreate);

                return Ok(armatureSafetyResultForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(ConsumptionWeldingMaterialsResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] ConsumptionWeldingMaterialsResult armatureSafetyResultForUpdate)
        {
            try
            {
                if (armatureSafetyResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _armatureSafetyResultService.Update(armatureSafetyResultForUpdate);

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
                await _armatureSafetyResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
