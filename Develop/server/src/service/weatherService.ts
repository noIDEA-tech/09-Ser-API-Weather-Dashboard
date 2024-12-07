import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    tempF: number,
    windSpeed: number,
    humidity: number
  ) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }
}
// class Weather {
//   cityName: string;
//   temperature: number;
//   humidity: number;
//   description: string;

//   constructor(cityName: string, temperature: number, humidity: number, description: string) {
//     this.cityName = cityName;
//     this.temperature = temperature;
//     this.humidity = humidity;
//     this.description = description;
//   }
// }  
  // TODO: Complete the WeatherService class
  class WeatherService {
    private baseURL: string;
    private apiKey: string;
    private cityName: string;

  // TODO: Define the baseURL, API key, and city name properties
  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
    this.apiKey = process.env.OPENWEATHER_API_KEY || '';
    this.cityName = '';
  }
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  private async fetchLocationData(query: string): Promise<any> {
      const geocodeQuery = this.buildGeocodeQuery(query);
      const response = await fetch(geocodeQuery);
      return response.json();
    }
  
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.coord.lat,
      longitude: locationData.coord.lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  private buildGeocodeQuery(cityName: string): string {
    return `${this.baseURL}/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`;
  }
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${this.apiKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    return response.json();
  }
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.city.name,
      response.list[0].dt_txt,
      response.list[0].weather[0].icon,
      response.list[0].weather[0].description,
      response.list[0].main.temp,
      response.list[0].wind.speed,
      response.list[0].main.humidity
    );
  }
  // old code: private parseCurrentWeather(response: any): Weather {
  //   return new Weather(
  //     response.name,
  //     response.main.temp,
  //     response.main.humidity,
  //     response.weather[0].description
  //   );
  // }
  // TODO: Complete buildForecastArray method
// private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecastArray: Weather[] = weatherData.map((data: any) => new Weather(
      currentWeather.city,
      data.dt_txt,
      data.weather[0].icon,
      data.weather[0].description,
      data.main.temp,
      data.wind.speed,
      data.main.humidity
    ));
    return [currentWeather, ...forecastArray];
  }

  // old code: private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
  //   console.log(currentWeather)
  //   return weatherData.map((data: any) => new Weather(
  //     data.name,
  //     data.main.temp,
  //     data.main.humidity,
  //     data.weather[0].description
  //   ));
  // }
   // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  public async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    return this.buildForecastArray(currentWeather, weatherData.list);
  }
}
 
export default new WeatherService();

//   old code: async getWeatherForCity(city: string): Promise<Weather[]> {
//     this.cityName = city;
//     const coordinates = await this.fetchAndDestructureLocationData();
//     const weatherData = await this.fetchWeatherData(coordinates);
//     const currentWeather = this.parseCurrentWeather(weatherData);
//     return this.buildForecastArray(currentWeather, weatherData.list);
//   }  
// }
//**THIS BLOCK OF CODE ADDED FROM AI CO-PILOT EXAMPLE OF HOW TO USE buildGeocodeQuery**//
  // public async getCoordinates(cityName: string): Promise<Coordinates> {
  //   const query = this.buildGeocodeQuery(cityName);
  //   const response = await fetch(query);
  //   const data = await response.json();
  //   if (data.length > 0) {
  //     return {
  //       latitude: data[0].lat,
  //       longitude: data[0].lon,
  //     };
  //   } else {
  //     throw new Error('City not found');
  //   }
  // }
  //**END OF ADDED CODE FROM AI CO-PILOT**//
