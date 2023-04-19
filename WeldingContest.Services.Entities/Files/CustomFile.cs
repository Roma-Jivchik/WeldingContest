using System.IO;

namespace WeldingContest.Services.Entities.Files
{
    public class CustomFile
    {
        public string FilePath { get; set; }
        public string Filename { get; set; }
        public Stream FileStream { get; set; }
    }
}
