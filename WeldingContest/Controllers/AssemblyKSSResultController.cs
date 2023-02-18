using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.AssemblyKSSResultServices;
using WeldingContest.Services.Entities.ContestResults;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class AssemblyKSSResultController : ControllerBase
    {
        private readonly IAssemblyKSSResultService _AssemblyKSSResultService;

        public AssemblyKSSResultController(IAssemblyKSSResultService AssemblyKSSResultService)
        {
            _AssemblyKSSResultService = AssemblyKSSResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var AssemblyKSSResults = await _AssemblyKSSResultService.GetAll();

                return Ok(AssemblyKSSResults);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(AssemblyKSSResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] AssemblyKSSResult AssemblyKSSResultForCreate)
        {
            try
            {
                if (AssemblyKSSResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _AssemblyKSSResultService.Create(AssemblyKSSResultForCreate);

                return Ok(AssemblyKSSResultForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(AssemblyKSSResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] AssemblyKSSResult AssemblyKSSResultForUpdate)
        {
            try
            {
                if (AssemblyKSSResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _AssemblyKSSResultService.Update(AssemblyKSSResultForUpdate);

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
                await _AssemblyKSSResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
