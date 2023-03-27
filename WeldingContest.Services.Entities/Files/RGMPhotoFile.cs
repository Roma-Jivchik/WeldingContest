using System.IO;

namespace WeldingContest.Services.Entities.Files
{
    public class RGMPhotoFile
    {
        public string ContestName { get; set; }
        public string NominationTitle { get; set; }
        public string ContestantRFID { get; set; }
        public Stream File { get; set; }
    }
}
