using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using TestProject.Services.Models;

namespace TestProject.Services.Implementations
{
    public class WeatherService : IWeatherService
    {
        private readonly IConfiguration _config;

        public WeatherService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<OpenWeatherResponseDto> GetWeatherForCityAsync(string cityName)
        {
            using ( var client = new HttpClient() )
            {
                try
                {
                    var apiKey = _config.GetValue<string>("OpenWeather:MyAPIKey");
                    var url = _config.GetValue<string>("OpenWeather:BaseAddress");
                    client.BaseAddress = new Uri(url);
                    var response = await client.GetAsync($"/data/2.5/weather?q={cityName}&appid={apiKey}&units=metric");
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

                    return result;
                }
                catch ( HttpRequestException httpRequestException )
                {
                    // return BadRequest($"Error getting weather from OpenWeather: {httpRequestException.Message}");

                    throw httpRequestException;
                }
            }
        }
    }
}
