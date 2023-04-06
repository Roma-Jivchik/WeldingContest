using System.Threading.Tasks;
using System.IO;
using WeldingContest.Services.Entities.Files;

namespace WeldingContest.Services.FileServices
{
    public interface IFileService
    {
        Task CreateRGMPhoto(RGMPhotoFile entity);

        Task CreateProtocolPhoto(ProtocolPhotoFile entity);
    }
}
