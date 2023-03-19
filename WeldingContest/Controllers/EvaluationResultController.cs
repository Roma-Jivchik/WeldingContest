using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestResults;
using WeldingContest.Services.EvaluationResultServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class EvaluationResultController : ControllerBase
    {
        private readonly IEvaluationResultService _evaluationResultService;

        public EvaluationResultController(IEvaluationResultService evaluationResultService)
        {
            _evaluationResultService = evaluationResultService;
        }

        [HttpGet]
        [Route("[controller]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var evaluationResults = await _evaluationResultService.GetAll();

                return Ok(evaluationResults);
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
                var contestants = await _evaluationResultService.Get(id);

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
                var evaluationResults = await _evaluationResultService.GetRange(pageNumber, rowsNumber);

                return Ok(evaluationResults);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-contestant-rfid")]
        public async Task<IActionResult> GetByContestantRFID(string RFID)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetByContestantRFIDAsync(RFID);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-contestant-company")]
        public async Task<IActionResult> GetRangeByContestantCompany(string company, int rowsNumber, int pageNumber)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetRangeByContestantCompanyAsync(company, rowsNumber, pageNumber);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-contestant-surname")]
        public async Task<IActionResult> GetRangeByContestantSurname(string surname, int rowsNumber, int pageNumber)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetRangeByContestantSurnameAsync(surname, rowsNumber, pageNumber);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-contest-title")]
        public async Task<IActionResult> GetRangeByContestTitle(string title, int rowsNumber, int pageNumber)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetRangeByContestTitleAsync(title, rowsNumber, pageNumber);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-nomination-title")]
        public async Task<IActionResult> GetRangeByNominationTitle(string title, int rowsNumber, int pageNumber)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetRangeByNominationTitleAsync(title, rowsNumber, pageNumber);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-sample-type")]
        public async Task<IActionResult> GetRangeBySampleType(string sampleType, int rowsNumber, int pageNumber)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetRangeBySampleTypeAsync(sampleType, rowsNumber, pageNumber);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-range-by-welding-type")]
        public async Task<IActionResult> GetRangeByWeldingType(string weldingType, int rowsNumber, int pageNumber)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetRangeByWeldingTypeAsync(weldingType, rowsNumber, pageNumber);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-contestant-company")]
        public async Task<IActionResult> GetByContestantCompany(int rowsNumber, int pageNumber)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetRangeByContestantCompany(rowsNumber, pageNumber);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-contestant-surname")]
        public async Task<IActionResult> GetByContestantSurname(int rowsNumber, int pageNumber)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetRangeByContestantSurname(rowsNumber, pageNumber);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-contest-title")]
        public async Task<IActionResult> GetByContestTitle(int rowsNumber, int pageNumber)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetRangeByContestTitle(rowsNumber, pageNumber);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-nomination-title")]
        public async Task<IActionResult> GetRangeByNominationTitle(int rowsNumber, int pageNumber)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetRangeByNominationTitle(rowsNumber, pageNumber);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-sample-type")]
        public async Task<IActionResult> GetBySampleType(int rowsNumber, int pageNumber)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetRangeBySampleType(rowsNumber, pageNumber);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpGet]
        [Route("[controller]/get-by-welding-type")]
        public async Task<IActionResult> GetByWeldingType(int rowsNumber, int pageNumber)
        {
            try
            {
                var evaluationResult = await _evaluationResultService.GetRangeByWeldingType(rowsNumber, pageNumber);

                return Ok(evaluationResult);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(EvaluationResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] EvaluationResult evaluationResultForCreate)
        {
            try
            {
                if (evaluationResultForCreate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _evaluationResultService.Create(evaluationResultForCreate);

                return Ok(evaluationResultForCreate);
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
                var contestants = await _evaluationResultService.GetPagesNumber(rowsNumber);

                return Ok(contestants);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPut]
        [Route("[controller]/update")]
        [ProducesResponseType(typeof(EvaluationResult), StatusCodes.Status200OK)]
        public async Task<IActionResult> Update([FromBody] EvaluationResult evaluationResultForUpdate)
        {
            try
            {
                if (evaluationResultForUpdate is null || !ModelState.IsValid)
                {
                    return BadRequest("Модель не подходит");
                }

                var result = await _evaluationResultService.Update(evaluationResultForUpdate);

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
                await _evaluationResultService.Remove(RFID);

                return Ok(RFID);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        //Выпилить
        [HttpGet]
        [Route("[controller]/temp/create-all")]
        public async Task<IActionResult> CreateAll()
        {
            try
            {
                var result = await _evaluationResultService.CreateAll();

                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
