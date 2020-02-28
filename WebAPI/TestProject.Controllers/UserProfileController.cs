using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TestProject.Data.Models;

namespace TestProject.Data.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        // Get: /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            // removed after test
            user.AboutMe = "test description about me;)";

            return new
            {
                user.FullName,
                user.Email,
                user.UserName,
                user.AboutMe
            };
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        [Route("ForAdmin")]
        public string GetForAdmin()
        {
            return "Test Web mothod for Admin";
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        [Route("ForUser")]
        public string GetForUser()
        {
            return "Test Web mothod for User";
        }

        [HttpGet]
        [Authorize(Roles = "Admin, User")]
        [Route("ForAdminOrUser")]
        public string GetForAdminOrUser()
        {
            return "Test Web mothod for Admin or User";
        }

    }
}