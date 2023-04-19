using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System;
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
        [ProducesResponseType(typeof(Contest), StatusCodes.Status200OK)]
        public async Task<IActionResult> Create([FromBody] Contest entity)
        {
            try
            {
                var protocol = await _protocolService.Create(entity);

                System.IO.File.WriteAllBytes(Directory.GetCurrentDirectory() + "/Protocols/OverallProtocol.xlsx", protocol);

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
