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
        public async Task<IActionResult> Post([FromBody] MyJson json)
        {
            if (json.image == null || json.image.Length == 0)
                return BadRequest("Upload a file");
            
            string[] allowedExtensions = {"image/jpeg", "image/png"};

            if (!allowedExtensions.Contains(json.type))
                return BadRequest("File is not a valid image");
            
            var newImage = new Image
            {
                Type = json.type,
                Base64String = json.image
            };

            await _imageService.AddImageAsync(newImage);

            return Ok();
        }
    }

    public class MyJson
    {
        public string image { get; set; }
        public string type { get; set; }
    }
}
