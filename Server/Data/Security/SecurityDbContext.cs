using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using SampleBlazorApp.Server.Models;

namespace SampleBlazorApp.Server.Data.Security
{
    public class SecurityDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public SecurityDbContext(
            DbContextOptions<SecurityDbContext> options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
    }
}
