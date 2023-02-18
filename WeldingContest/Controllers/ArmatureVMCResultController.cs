using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.ArmatureVMCServices;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class ArmatureVMCResultController : ControllerBase
    {
        private readonly IArmatureVMCResultService _armatureVMCResultService;

        public ArmatureVMCResultController(IArmatureVMCResultService armatureVMCResultService)
        {
            _armatureVMCResultService = armatureVMCResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var armatureVMCResults = await _armatureVMCResultService.GetAll();

                return Ok(armatureVMCResults);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(ArmatureVMCResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] ArmatureVMCResult armatureVMCResultForCreate)
        {
            try
            {
                if (armatureVMCResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _armatureVMCResultService.Create(armatureVMCResultForCreate);

                return Ok(armatureVMCResultForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(ArmatureVMCResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] ArmatureVMCResult armatureVMCResultForUpdate)
        {
            try
            {
                if (armatureVMCResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _armatureVMCResultService.Update(armatureVMCResultForUpdate);

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
                await _armatureVMCResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
