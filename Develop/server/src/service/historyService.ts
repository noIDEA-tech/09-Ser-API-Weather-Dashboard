import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


// TODO: Define a City class with name and id properties
interface City {
  id: string;
  name: string;

  
}
// TODO: Complete the HistoryService class
class HistoryService {
  private  readonly filePath: string;

  constructor() {
    this.filePath = path.join(__dirname, '../../db/searchHistory.json');
  }

// TODO: Define a read method that reads from the searchHistory.json file
// async read() {
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {

      return [];
    }
  }

  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
  } 

// TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
// async getCities() {}
  async getCities(): Promise<City[]> {
    return this.read();
  }
  
  async addCity(cityName: string): Promise<City> {
      const cities = await this.read();

      const existingCity = cities.find(city =>
       city.name.toLowerCase() === cityName.toLowerCase()
    );

    if (existingCity) {
      return existingCity;
    }

     const newCity: City = {
        id: uuidv4(),
        name: cityName
    };

      cities.push(newCity);
      await this.write(cities);
      return newCity;
  }

  async removeCity(id: string): Promise<void> {
      const cities = await this.read();
      const updatedCities = cities.filter(city => city.id !== id);
      await this.write(updatedCities);
  }
}

export default new HistoryService();
// TODO Define an addCity method that adds a city to the searchHistory.json file
// async addCity(city: string) {}

//MOVED FROM LINE 10-14 1.1.2025
// constructor(name: string) {
  //   this.id = Math.random().toString(36).substring(2, 15);
  //   this.name = name;
  // }

// * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
// async removeCity(id: string) {}
// async removeCity(id: string): Promise<void> {
//   try {
//       let cities = await this.read();
//       cities = cities.filter(city => city.id !== id);
//       await this.write(cities);
//     } catch (error) {
//       throw new Error('Failed to remove city from history');
//     }
//   }
// }



// TODO: Define a read method that reads from the searchHistory.json file
  // async read() {
  //   return await fs.readFile('db/searchHistory.json', {
  //     flag: 'a+',
  //     encoding: 'utf8',
  //   });
  // }

// TODO: Define a write method that writes the updated cities array to the searchHistory.json file
// private async write(cities: City[]) {}
  // async write(cities: City[]) {
  //   return await fs.writeFile('db/searchHistory.json', JSON.stringify(cities, null, '\t'));
  // }

// TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
// async getCities() {}
  // async getCities() {
  //   return await this.read().then((cities) => {
  //     let parsedCities: City[];

  //     try {
  //       parsedCities = [].concat(JSON.parse(cities));
  //     } catch (err) {
  //       parsedCities = [];
  //     }

  //     return parsedCities;

  //   });
  // }

// TODO Define an addCity method that adds a city to the searchHistory.json file
// async addCity(city: string) {}
  // async addCity(city: string) {
  //   if (!city) {
  //     throw new Error('city cannot be blank');
  //   }

  //   const cities = await this.getCities();
  //   const newCity = new City(city);
  //   cities.push(newCity);
  //   await this.write(cities);
  // }

 


  

  
 
  


