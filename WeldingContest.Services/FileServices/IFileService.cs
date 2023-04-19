using System.Threading.Tasks;
using WeldingContest.Services.Entities.Files;

namespace WeldingContest.Services.FileServices
{
    public interface IFileService
    {
        Task CreateRGMPhoto(RGMPhotoFile entity);

        Task CreateProtocolPhoto(ProtocolPhotoFile entity);

        Task Create(CustomFile entity);

        void Delete(string filePath);
    }
}
