using System.Threading.Tasks;
using TestProject.Services.Models;

namespace TestProject.Services
{
    public interface IWeatherService
    {
        Task<OpenWeatherResponseDto> GetWeatherForCityAsync(string cityName);
    }
}
