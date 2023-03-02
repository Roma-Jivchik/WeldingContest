﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.ContestantServices;
using WeldingContest.Services.Entities.ContestMembers;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class ContestantController : ControllerBase
    {
        private readonly IContestantService _contestantService;

        public ContestantController(IContestantService contestantService)
        {
            _contestantService = contestantService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var contestants = await _contestantService.GetAll();

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-pages-number")]
        public async Task<IActionResult> GetPagesNumber(int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetPagesNumber(rowsNumber);

                return Ok(contestants);
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
                var contestants = await _contestantService.Get(id);

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
                var contestants = await _contestantService.GetRange(pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-rfid")]
        public async Task<IActionResult> GetRangeByRFID(int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetAllByRFID(pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-qr")]
        public async Task<IActionResult> GetRangeByQR(int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetAllByQR(pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-company")]
        public async Task<IActionResult> GetRangeByCompany(int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetAllByCompany(pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-surname-range")]
        public async Task<IActionResult> GetBySurnameRange(string surname, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetBySurnameRangeAsync(surname, pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-company-range")]
        public async Task<IActionResult> GetByCompanyRange(string company, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetByCompanyRangeAsync(company, pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-contest-works-range")]
        public async Task<IActionResult> GetByContestWorksRange(string nomination, int pageNumber, int rowsNumber)
        {
            try
            {
                var contestants = await _contestantService.GetByContestWorksRangeAsync(nomination, pageNumber, rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-qr")]
        public async Task<IActionResult> GetByQR(string QR)
        {
            try
            {
                var contestants = await _contestantService.GetByQRAsync(QR);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-rfid")]
        public async Task<IActionResult> GetByRFID(string RFID)
        {
            try
            {
                var contestants = await _contestantService.GetByRFIDAsync(RFID);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-surname")]
        public async Task<IActionResult> GetBySurname(string surname)
        {
            try
            {
                var contestants = await _contestantService.GetContestantBySurnameAsync(surname);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(Contestant), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] Contestant contestantForCreate)
        {
            try
            {
                if (contestantForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _contestantService.Create(contestantForCreate);

                return Ok(contestantForCreate);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(Contestant), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] Contestant contestantForUpdate)
        {
            try
            {
                if (contestantForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _contestantService.Update(contestantForUpdate);

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
                await _contestantService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
