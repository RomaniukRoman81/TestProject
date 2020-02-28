using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TestProject.Data.Models
{
    public class AuthenticationContext : IdentityDbContext
    {
        public AuthenticationContext(DbContextOptions<AuthenticationContext> options) : base(options)
        {

        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        public DbSet<PaymentDetail> PaymentDetails { get; set; }
    }
}
