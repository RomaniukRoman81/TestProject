using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestProject.Data.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName ="nvarchar(150)")]
        public string FullName { get; set; }

        [Column(TypeName ="nvarchar(300)")]
        public string AboutMe { get; set; }
    }
}
