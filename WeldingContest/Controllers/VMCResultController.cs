using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestResults;
using WeldingContest.Services.VMCResultServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class VMCResultController : ControllerBase
    {
        private readonly IVMCResultService _VMCResultService;

        public VMCResultController(IVMCResultService VMCResultService)
        {
            _VMCResultService = VMCResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var VMCResults = await _VMCResultService.GetAll();

                return Ok(VMCResults);
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
                var VMCResults = await _VMCResultService.GetRange(pageNumber, rowsNumber);

                return Ok(VMCResults);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(VMCResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] VMCResult VMCResultForCreate)
        {
            try
            {
                if (VMCResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _VMCResultService.Create(VMCResultForCreate);

                return Ok(VMCResultForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(VMCResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] VMCResult VMCResultForUpdate)
        {
            try
            {
                if (VMCResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _VMCResultService.Update(VMCResultForUpdate);

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
                await _VMCResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
