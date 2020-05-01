using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TestProject.Controllers.Models;
using TestProject.Services.Models;

namespace TestProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly IConfiguration _config;

        public WeatherController(IConfiguration config)
        {
            _config = config;
        }

        [HttpGet("{city}")]
        public async Task<IActionResult> City(string city)
        {
            using ( var client = new HttpClient() )
            {
                try
                {
                    var test = _config.GetValue<string>("OpenWeather:MyAPIKey");
                    var url = _config.GetValue<string>("OpenWeather:BaseAddress");
                    client.BaseAddress = new Uri(url);
                    var response = await client.GetAsync($"/data/2.5/weather?q={city}&appid={test}&units=metric");
                    response.EnsureSuccessStatusCode();

                    var stringResult = await response.Content.ReadAsStringAsync();
                    var rawWeather = JsonConvert.DeserializeObject<OpenWeatherResponse>(stringResult);

                    var result = new OpenWeatherResponseDto
                    {
                        CityName = rawWeather.Name,
                        WeatherMain = string.Join(",", rawWeather.Weather.Select(x => x.Main)),
                        WeatherDescription = string.Join(",", rawWeather.Weather.Select(x => x.Description)),
                        WeatherIcon = rawWeather.Weather.First().Icon,
                        Temp = rawWeather.Main.Temp,
                        TempFeelsLike = rawWeather.Main.Feels_Like,
                        WindSpeed = rawWeather.Wind.Speed
                    };

                    return Ok(result);
                }
                catch ( HttpRequestException httpRequestException )
                {
                    return BadRequest($"Error getting weather from OpenWeather: {httpRequestException.Message}");
                }
            }
        }
    }
}
