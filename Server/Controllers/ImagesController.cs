using Microsoft.AspNetCore.Mvc;
using SampleBlazorApp.Server.Data.Image;
using SampleBlazorApp.Server.Models;
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
        public async Task<IActionResult> Post([FromBody] InputModel json)
        {
            if (json.Image == null || json.Image.Length == 0)
                return BadRequest("Upload a file");
            
            string[] allowedExtensions = {"image/jpeg", "image/png"};

            if (!allowedExtensions.Contains(json.Type))
                return BadRequest("File is not a valid image");
            
            var newImage = new Image
            {
                Type = json.Type,
                Base64String = json.Image
            };

            await _imageService.AddImageAsync(newImage);

            return Ok();
        }
    }
}
