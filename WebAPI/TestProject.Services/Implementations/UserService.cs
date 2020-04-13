using TestProject.Data.Models;
using TestProject.Services.Models.User;

namespace TestProject.Services.Implementations
{
    public class UserService : IUserService
    {
        public UserDto GetUserDetail(ApplicationUser user)
        {
            UserDto userDetail = new UserDto
            {
                UserName = user.UserName,
                FullName = user.FullName,
                Email = user.Email,
                AboutMe = user.AboutMe
            };

            return userDetail;
        }
    }
}
