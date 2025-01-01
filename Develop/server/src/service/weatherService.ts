import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();
// import fetch from 'node-fetch';

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
  name: string;
}
  
// TODO: Define a class for the Weather object
interface Weather {
  city: string; // Keep this as it was in the original interface
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
}
 
//  interface ForecastDay {
//   weather: {
//     icon: string;
//     description: string;
//   }[];
//   temp: {
//     day: number;
//   };
//   wind_speed: number;
//   humidity: number;
//   dt: number;
// }

 // TODO: Complete the WeatherService class//ADDED 'private' 12.11.24
 class WeatherService {
  private readonly baseURL: string;
  private readonly apiKey: string;

  // TODO: Define the baseURL, API key, and city name properties
  constructor() {
      this.baseURL = 'https://api.openweathermap.org/data/2.5';
      this.apiKey = process.env.OPENWEATHER_API_KEY || '';
  }
// TODO: Create fetchLocationData method
private async fetchLocationData(query: string): Promise<any> {
    const geoUrl = 'http://api.openweathermap.org/geo/1.0/direct';
    const response = await axios.get(`${geoUrl}?q=${query}&limit=1&appid=${this.apiKey}`);
    return response.data[0];
  }

// TODO: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    const { lat, lon, name } = locationData;
    return { lat, lon, name };
  }

 // TODO: Create buildGeocodeQuery method
 // @ts-ignore
  private buildGeocodeQuery(): string {
    return this.apiKey;
  }

// TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }

// TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(query: string): Promise<Coordinates> {
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }
// TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const query = this.buildWeatherQuery(coordinates);
    const response = await axios.get(query);
    return response.data;
  } 

private parseCurrentWeather(response: any): Weather {
    const current = response.list[0];
    return {
      city: response.city.name,
      date: new Date(current.dt * 1000).toLocaleDateString(),
      icon: current.weather[0].icon,
      iconDescription: current.weather[0].description,
      tempF: Math.round(current.main.temp),
      windSpeed: Math.round(current.wind.speed),
      humidity: current.main.humidity
    };
  }

 
private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const forecast = weatherData
    .filter((_: any, index: number) => index % 8 === 0)
    .map((day: any) => ({
      city: currentWeather.city,
      date: new Date(day.dt * 1000).toLocaleDateString(),
      icon: day.weather[0].icon,
      iconDescription: day.weather[0].description,
      tempF: Math.round(day.main.temp),
      windSpeed: Math.round(day.wind.speed),
      humidity: day.main.humidity
  }));
    return [currentWeather, ...forecast];
  }
  async getWeatherForCity(city: string): Promise<Weather[]> {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    return this.buildForecastArray(currentWeather, weatherData.list); 
  }
}

export default new WeatherService();
 // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}

  // private async fetchAndDestructureLocationData(): Promise<Coordinates> {
  //   const locationData = await this.fetchLocationData(this.cityName);
  

  // private buildGeocodeQuery(cityName: string): string {
  //   return `${this.baseURL}/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`;
  // }
  
  //
  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {} 
  // Extract coordinates from location data
  
  // TODO: Create fetchWeatherData method//MOVED UP FROM LINE 127 NJF
  // private async fetchWeatherData(coordinates: Coordinates) {}
  
  
  
 

  
 
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  //KEEP 'fetchWeatherData' code: 12.17.24
  // private async fetchWeatherData(coordinates: Coordinates) {
  //   const weatherUrl = `${this.baseURL}/onecall`;

  //   try {
  //     const response = await fetch(`${weatherUrl}?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`);
      
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch weather data');
  //     }
      
  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error fetching weather data:', error);
  //     throw new Error('Unable to retrieve weather information');
  //   }
  // }

  // TODO: Build parseCurrentWeather method
  // // private parseCurrentWeather(response: any) {}
  // private parseCurrentWeather(response: any): Weather {
  //   return new Weather(
  //     response.city.name,
  //     response.list[0].dt_txt,
  //     response.list[0].weather[0].icon,
  //     response.list[0].weather[0].description,
  //     response.list[0].main.temp,
  //     response.list[0].wind.speed,
  //     response.list[0].main.humidity
  //   );
  // }
  // old code: private parseCurrentWeather(response: any): Weather {
  //   return new Weather(
  //     response.name,
  //     response.main.temp,
  //     response.main.humidity,
  //     response.weather[0].description
  //   );
  // }
  // TODO: Complete buildForecastArray method
//
  
   // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  
//   public async getWeatherForCity(city: string): Promise<Weather[]> {
//     this.cityName = city;
//     const coordinates = await this.fetchAndDestructureLocationData();
//     const weatherData = await this.fetchWeatherData(coordinates);
//     const currentWeather = this.parseCurrentWeather(weatherData);
//     return this.buildForecastArray(currentWeather, weatherData.list);
//   }
// }
 




  // constructor (
  //   city: string,
  //   date: string,
  //   icon: string,
  //   iconDescription: string,
  //   tempF: number,
  //   windSpeed: number,
  //   humidity: number
  // ) {
  //   this.city = city;
  //   this.date = date;
  //   this.icon = icon;
  //   this.iconDescription = iconDescription;
  //   this.tempF = tempF;
  //   this.windSpeed = windSpeed;
  //   this.humidity = humidity;
//   // }
// }
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
  // class WeatherService {
  //   baseURL?: string;
  //   apiKey?: string;
  //   cityName: string;

  // // TODO: Define the baseURL, API key, and city name properties
 
  // constructor() {
  //   this.baseURL = process.env.API_BASE_URL || '';
  //   this.apiKey = process.env.OPENWEATHER_API_KEY || '';
  //   this.cityName = '';
  // }
//   old code: async getWeatherForCity(city: string): Promise<Weather[]> {
//     this.cityName = city;
//     const coordinates = await this.fetchAndDestructureLocationData();
//     const weatherData = await this.fetchWeatherData(coordinates);
//     const currentWeather = this.parseCurrentWeather(weatherData);
//     return this.buildForecastArray(currentWeather, weatherData.list);
//   }  
// }
// old code: private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
  //   console.log(currentWeather)
  //   return weatherData.map((data: any) => new Weather(
  //     data.name,
  //     data.main.temp,
  //     data.main.humidity,
  //     data.weather[0].description
  //   ));
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
