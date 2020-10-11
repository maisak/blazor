using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SampleBlazorApp.Server.Data.Security;
using System.Threading.Tasks;
using SampleBlazorApp.Server.Data.Image;

namespace SampleBlazorApp.Server
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var serviceScope = host.Services.CreateScope())
            {
                var serviceProvider = serviceScope.ServiceProvider;
                await using var securityContext = serviceProvider.GetRequiredService<SecurityDbContext>();
                await using var imageContext = serviceProvider.GetRequiredService<ImageDbContext>();
                await securityContext.Database.MigrateAsync();
                await imageContext.Database.MigrateAsync();
            }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
