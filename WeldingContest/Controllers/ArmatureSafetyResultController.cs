using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.ArmatureSafetyResultServices;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class ArmatureSafetyResultController : ControllerBase
    {
        private readonly IArmatureSafetyResultService _armatureSafetyResultService;

        public ArmatureSafetyResultController(IArmatureSafetyResultService armatureSafetyResultService)
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

        [HttpGet]
        [Route("[controller]/get-by-id")]
        public async Task<IActionResult> GetByID(string id)
        {
            try
            {
                var contestants = await _armatureSafetyResultService.Get(id);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(ArmatureSafetyResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] ArmatureSafetyResult armatureSafetyResultForCreate)
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
        [ProducesResponseType(typeof(ArmatureSafetyResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] ArmatureSafetyResult armatureSafetyResultForUpdate)
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
