using System.Collections.Generic;

namespace TestProject.Services.Models
{
    public class OpenWeatherResponse
    {
        public string Name { get; set; }

        public IEnumerable<WeatherDescription> Weather { get; set; }

        public Main Main { get; set; }

        public Wind Wind { get; set; }
    }

    public class WeatherDescription
    {
        public string Main { get; set; }

        public string Description { get; set; }

        public string Icon { get; set; }
    }

    public class Main
    {
        public string Temp { get; set; }

        public string Feels_Like { get; set; }
    }

    public class Wind
    {
        public string Speed { get; set; }
    }
}
