﻿using System.Threading.Tasks;

namespace SampleBlazorApp.Server.Data.Image
{
    public class ImageService
    {
        #region Private members
        private readonly ImageDbContext _dbContext;
        #endregion

        #region Constructor
        public ImageService(ImageDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        #endregion

        #region Public methods

        /// <summary>
        /// This method add a new image to the DbContext and saves it
        /// </summary>
        /// <param name="image"></param>
        /// <returns></returns>
        public async Task<Image> AddImageAsync(Image image)
        {
            _dbContext.Image.Add(image);
            await _dbContext.SaveChangesAsync();

            return image;
        }

        ///// <summary>
        ///// This method returns the list of images
        ///// </summary>
        ///// <returns></returns>
        //public async Task<List<Image>> GetImageAsync()
        //{
        //    return await dbContext.Image.ToListAsync();
        //}

        ///// <summary>
        ///// This method update and existing image and saves the changes
        ///// </summary>
        ///// <param name="image"></param>
        ///// <returns></returns>
        //public async Task<Image> UpdateImageAsync(Image image)
        //{
        //    try
        //    {
        //        var imageExist = dbContext.Image.FirstOrDefault(i => i.Id == image.Id);
        //        if (imageExist != null)
        //        {
        //            dbContext.Update(image);
        //            await dbContext.SaveChangesAsync();
        //        }
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //    return image;
        //}

        ///// <summary>
        ///// This method removes and existing image from the DbContext and saves it
        ///// </summary>
        ///// <param name="image"></param>
        ///// <returns></returns>
        //public async Task DeleteImageAsync(Image image)
        //{
        //    try
        //    {
        //        dbContext.Image.Remove(image);
        //        await dbContext.SaveChangesAsync();
        //    }
        //    catch (Exception)
        //    {
        //        throw;
        //    }
        //}
        #endregion
    }
}
