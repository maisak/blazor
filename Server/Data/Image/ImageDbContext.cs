using Microsoft.EntityFrameworkCore;

namespace SampleBlazorApp.Server.Data.Image
{
    public class ImageDbContext : DbContext
    {
        #region Constructor
        public ImageDbContext(DbContextOptions<ImageDbContext> options) : base(options)
        { }
        #endregion

        #region Public properties
        public DbSet<Image> Image { get; set; }
        #endregion
    }
}
