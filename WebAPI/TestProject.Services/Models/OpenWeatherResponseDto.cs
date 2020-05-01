namespace TestProject.Services.Models
{
    public class OpenWeatherResponseDto
    {
        public string CityName { get; set; }

        public string WeatherMain { get; set; }

        public string WeatherDescription { get; set; }

        public string WeatherIcon { get; set; }

        public string Temp { get; set; }

        public string TempFeelsLike { get; set; }

        public string WindSpeed { get; set; }
    }
}
