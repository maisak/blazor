using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using SampleBlazorApp.Server.Data.Image;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SampleBlazorApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IHostEnvironment _environment;
        private readonly ImageService _imageService;

        public ImagesController(IHostEnvironment environment, ImageService imageService )
        {
            this._environment = environment;
            this._imageService = imageService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] IFormFile image)
        {
            if (image == null || image.Length == 0)
                return BadRequest("Upload a file");

            string fileName = image.FileName;
            string extension = Path.GetExtension(fileName);
            
            string[] allowedExtensions = {".jpg", ".png", ".bmp"};

            if (!allowedExtensions.Contains(extension))
                return BadRequest("File is not valid image");

            var stringToMoveToDb = String.Empty;

            await using (var ms = new MemoryStream())
            {
                await image.CopyToAsync(ms);
                stringToMoveToDb = Convert.ToBase64String(ms.ToArray());
            }

            var newImage = new Image
            {
                Type = extension,
                Base64String = stringToMoveToDb
            };

            await _imageService.AddImageAsync(newImage);

            return Ok($"Image");
        }
    }
}
