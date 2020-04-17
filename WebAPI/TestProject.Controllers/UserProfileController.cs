using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TestProject.Data.Models;
using TestProject.Services;
using TestProject.Services.Models.User;

namespace TestProject.Data.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private readonly IUserService _userService;

        public UserProfileController(UserManager<ApplicationUser> userManager, IUserService userService)
        {
            _userManager = userManager;
            _userService = userService;
        }

        [HttpGet]
        [Authorize]
        // Get: /api/UserProfile
        public async Task<UserDto> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);

            return _userService.GetUserDetail(user);
        }

        [HttpPut]
        [Authorize]
        public async Task UpdateUserProfile(UserDto userDto)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);

            if (userId != userDto.Id)
            {
                throw new ArgumentException("User Id does not match");
            }

            await _userService.UpdateUserProfileAsync(user, userDto);
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