using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System;
using System.IO;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestMembers;
using WeldingContest.Services.ProtocolServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class ProtocolController : ControllerBase
    {
        private readonly IProtocolService<Contest> _protocolService;

        public ProtocolController(IProtocolService<Contest> protocolService)
        {
            _protocolService = protocolService;
        }

        [HttpPost]
        [Route("[controller]/create")]
        public async Task<IActionResult> Create([FromBody] Contest entity)
        {
            try
            {
                var result = await _protocolService.Create(entity);

                var directoryName = entity.Name.Replace(" ", "_");

                var filePath = Directory.GetCurrentDirectory() + $"\\Protocols\\{directoryName}";
                var fileName = "OverallProtocol.xlsx";

                Directory.CreateDirectory(filePath);

                System.IO.File.WriteAllBytes($"{filePath}\\{fileName}", result);

                return new FileContentResult(result, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
