using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.ContestMembers;
using WeldingContest.Services.ProtocolServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class ProtocolController : ControllerBase
    {
        private readonly IProtocolServiceBase<Contest> _protocolService;

        public ProtocolController(IProtocolServiceBase<Contest> protocolService)
        {
            _protocolService = protocolService;
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(Contest), StatusCodes.Status200OK)]
        public IActionResult Create([FromBody] Contest entity)
        {
            try
            {
                _protocolService.CreateProtocol(entity);

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
