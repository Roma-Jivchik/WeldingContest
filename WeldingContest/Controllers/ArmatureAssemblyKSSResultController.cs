using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.ArmatureAssemblyKSSResultServices;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class ArmatureAssemblyKSSResultController : ControllerBase
    {
        private readonly IArmatureAssemblyKSSResultService _armatureAssemblyKSSResultService;

        public ArmatureAssemblyKSSResultController(IArmatureAssemblyKSSResultService armatureAssemblyKSSResultService)
        {
            _armatureAssemblyKSSResultService = armatureAssemblyKSSResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var armatureAssemblyKSSResults = await _armatureAssemblyKSSResultService.GetAll();

                return Ok(armatureAssemblyKSSResults);
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
                var contestants = await _armatureAssemblyKSSResultService.Get(id);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(ArmatureAssemblyKSSResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] ArmatureAssemblyKSSResult armatureAssemblyKSSResultForCreate)
        {
            try
            {
                if (armatureAssemblyKSSResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _armatureAssemblyKSSResultService.Create(armatureAssemblyKSSResultForCreate);

                return Ok(armatureAssemblyKSSResultForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(ArmatureAssemblyKSSResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] ArmatureAssemblyKSSResult armatureAssemblyKSSResultForUpdate)
        {
            try
            {
                if (armatureAssemblyKSSResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _armatureAssemblyKSSResultService.Update(armatureAssemblyKSSResultForUpdate);

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
                await _armatureAssemblyKSSResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
