using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TestProject.Services;
using TestProject.Services.Models;

namespace TestProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly IWeatherService _weatherService;

        public WeatherController(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        // GET: api/Weather/City
        [HttpGet("{city}")]
        public async Task<ActionResult<OpenWeatherResponseDto>> City(string city)
        {

            var result = await _weatherService.GetWeatherForCityAsync(city);

            return Ok(result);
        }
    }
}
