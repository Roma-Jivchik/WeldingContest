using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WeldingContest.Services.Entities;
using WeldingContest.Services.FileServices;

namespace WeldingContest.Controllers
{
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService<RGMPhotoFile> _fileService;

        public FileController(IFileService<RGMPhotoFile> fileService)
        {
            _fileService = fileService;
        }

        [HttpPost]
        [Route("[controller]/create")]
        [ProducesResponseType(typeof(RGMPhotoFile), StatusCodes.Status200OK)]
        public IActionResult Create()
        {
            try
            {
                var rgmPhotoFile = new RGMPhotoFile();

                rgmPhotoFile.ContestName = Request.Form["contestName"];
                rgmPhotoFile.ContestantRFID = Request.Form["contestantRFID"];
                rgmPhotoFile.NominationTitle = Request.Form["nominationTitle"];
                rgmPhotoFile.File = Request.Form.Files[0].OpenReadStream();

                _fileService.Create(rgmPhotoFile);

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(500, $"{e.Message}");
            }
        }
    }
}
