﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using WeldingContest.Services.Entities;
using System.IO;

namespace WeldingContest.Services.FileServices
{
    public class FileService : IFileService<RGMPhotoFile>
    {
        private string _location;

        public FileService(IWebHostEnvironment appEnvironment)
        {
            var location = appEnvironment.WebRootPath;
            _location = location + @"\Фото\";
        }

        public void Create(RGMPhotoFile entity)
        {
            string filePath = _location + $@"{entity.ContestName}\{entity.NominationTitle}\{entity.ContestantRFID}\";

            string fileName = $"Рентген_{entity.ContestantRFID}.jpg";

            Directory.CreateDirectory(filePath);
            filePath += fileName;
            byte[] fileBytes = new byte[entity.File.Length];
            entity.File.Read(fileBytes, 0, (int)entity.File.Length);
            File.WriteAllBytes(filePath, fileBytes);
        }
    }
}