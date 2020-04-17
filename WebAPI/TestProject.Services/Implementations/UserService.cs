using System.Threading.Tasks;
using TestProject.Data.Models;
using TestProject.Services.Models.User;

namespace TestProject.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly TestProjectContext _context;

        public UserService(TestProjectContext context)
        {
            _context = context;
        }

        public UserDto GetUserDetail(ApplicationUser user)
        {
            UserDto userDetail = new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                FullName = user.FullName,
                Email = user.Email,
                AboutMe = user.AboutMe
            };

            return userDetail;
        }

        public async Task UpdateUserProfileAsync(ApplicationUser user, UserDto userDto)
        {
            user.Id = userDto.Id;
            user.UserName = userDto.UserName;
            user.FullName = userDto.FullName;
            user.Email = userDto.Email;
            user.AboutMe = userDto.AboutMe;

            if (_context != null)
            {
                _context.Update(user);

                await _context.SaveChangesAsync();
            }
        }
    }
}
