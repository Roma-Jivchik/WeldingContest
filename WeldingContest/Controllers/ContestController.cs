﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.ContestServices;
using WeldingContest.Services.Entities.ContestMembers;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class ContestController : ControllerBase
    {
        private readonly IContestService _contestService;

        public ContestController(IContestService contestService)
        {
            _contestService = contestService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var contests = await _contestService.GetAll();

                return Ok(contests);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-all-by-title")]
        public async Task<IActionResult> GetAllByTitle()
        {
            try
            {
                var contests = await _contestService.GetRangeByTitle();

                return Ok(contests);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-all-by-end-date")]
        public async Task<IActionResult> GetAllByEndDate()
        {
            try
            {
                var contests = await _contestService.GetRangeByEndDate();

                return Ok(contests);
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
                var contestants = await _contestService.Get(id);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-end-date")]
        public async Task<IActionResult> GetByEndDate(string endDate)
        {
            try
            {
                var contestants = await _contestService.GetByEndDateAsync(endDate);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-begin-date")]
        public async Task<IActionResult> GetByBeginDate(string beginDate)
        {
            try
            {
                var contestants = await _contestService.GetByBeginDateAsync(beginDate);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-title")]
        public async Task<IActionResult> GetByTitle(string title)
        {
            try
            {
                var contestants = await _contestService.GetByTitleAsync(title);

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
                var contests = await _contestService.GetRange(pageNumber, rowsNumber);

                return Ok(contests);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-contestant-id")]
        public async Task<IActionResult> GetbyContestantID(string ID, int pageNumber, int rowsNumber)
        {
            try
            {
                var contests = await _contestService.GetByContestantIDAsync(ID, pageNumber, rowsNumber);

                return Ok(contests);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(Contest), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] Contest contestForCreate)
        {
            try
            {
                if (contestForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _contestService.Create(contestForCreate);

                return Ok(contestForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(Contest), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] Contest contestForUpdate)
        {
            try
            {
                if (contestForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _contestService.Update(contestForUpdate);

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
                await _contestService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
