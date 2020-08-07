using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        private readonly ImageService _imageService;

        public ImagesController(ImageService imageService )
        {
            _imageService = imageService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromForm] IFormFile image)
        {
            if (image == null || image.Length == 0)
                return BadRequest("Upload a file");

            var fileName = image.FileName;
            var extension = Path.GetExtension(fileName);
            
            string[] allowedExtensions = {".jpg", ".png", ".bmp"};

            if (!allowedExtensions.Contains(extension))
                return BadRequest("File is not a valid image");

            string stringToMoveToDb;

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

            return Ok();
        }
    }
}
