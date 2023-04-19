using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.Entities.Files;
using WeldingContest.Services.FileServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost]
        [Route("[controller]/create/rgm")]
        [ProducesResponseType(typeof(RGMPhotoFile), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateRGMPhoto()
        {
            try
            {
                var rgmPhotoFile = new RGMPhotoFile();

                rgmPhotoFile.ContestName = Request.Form["contestName"];
                rgmPhotoFile.ContestantRFID = Request.Form["contestantRFID"];
                rgmPhotoFile.NominationTitle = Request.Form["nominationTitle"];
                rgmPhotoFile.File = Request.Form.Files[0].OpenReadStream();

                await _fileService.CreateRGMPhoto(rgmPhotoFile);

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create/protocol")]
        [ProducesResponseType(typeof(ProtocolPhotoFile), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateProtocol()
        {
            try
            {
                var protocolPhotoFile = new ProtocolPhotoFile();

                protocolPhotoFile.ContestName = Request.Form["contestName"];
                protocolPhotoFile.ContestantRFID = Request.Form["contestantRFID"];
                protocolPhotoFile.NominationTitle = Request.Form["nominationTitle"];
                protocolPhotoFile.File = Request.Form.Files[0].OpenReadStream();

                await _fileService.CreateProtocolPhoto(protocolPhotoFile);

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(ProtocolPhotoFile), StatusCodes.Status200OK)]
        public async Task<IActionResult> CreateFile()
        {
            try
            {
                var file = new CustomFile();

                file.FilePath = Request.Form["filePath"];
                file.Filename = Request.Form["filename"];
                file.FileStream = Request.Form.Files[0].OpenReadStream();

                await _fileService.Create(file);

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }

        [HttpDelete]
        [Route("[controller]/delete")]
        [ProducesResponseType(typeof(ProtocolPhotoFile), StatusCodes.Status200OK)]
        public IActionResult Delete([FromBody]string filePath)
        {
            try
            {
                _fileService.Delete(filePath);

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
