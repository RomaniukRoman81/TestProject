using TestProject.Data.Models;
using TestProject.Services.Models.User;

namespace TestProject.Services
{
    public interface IUserService
    {
        UserDto GetUserDetail(ApplicationUser user);
    }
}
