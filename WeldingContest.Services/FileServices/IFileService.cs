using System.Threading.Tasks;
using System.IO;
using WeldingContest.Services.Entities.Files;

namespace WeldingContest.Services.FileServices
{
    public interface IFileService
    {
        void CreateRGMPhoto(RGMPhotoFile entity);

        void CreateProtocolPhoto(ProtocolPhotoFile entity);
    }
}
