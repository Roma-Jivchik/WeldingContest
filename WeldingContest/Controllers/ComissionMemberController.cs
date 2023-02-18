using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WeldingContest.Services.ComissionMemberServices;
using WeldingContest.Services.Entities.ContestMembers;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class ComissionMemberController : ControllerBase
    {
        private readonly IComissionMemberService _comissionMemberService;

        public ComissionMemberController(IComissionMemberService comissionMemberService)
        {
            _comissionMemberService = comissionMemberService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var comissionMembers = await _comissionMemberService.GetAll();

                return Ok(comissionMembers);
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
                var comissionMembers = await _comissionMemberService.GetRange(pageNumber, rowsNumber);

                return Ok(comissionMembers);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(ComissionMember), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] ComissionMember comissionMemberForCreate)
        {
            try
            {
                if (comissionMemberForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _comissionMemberService.Create(comissionMemberForCreate);

                return Ok(comissionMemberForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(ComissionMember), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] ComissionMember comissionMemberForUpdate)
        {
            try
            {
                if (comissionMemberForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _comissionMemberService.Update(comissionMemberForUpdate);

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
                await _comissionMemberService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
