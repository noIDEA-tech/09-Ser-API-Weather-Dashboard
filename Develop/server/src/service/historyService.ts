// import fs from 'fs/promises';
// import path from 'path';

// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = Math.random().toString(36).substring(2, 15);
    this.name = name;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
  private filePath: string;

  constructor() {
    this.filePath = './db/searchHistory.json';
  }

// TODO: Define a read method that reads from the searchHistory.json file
// async read() {
  private async read(): Promise<City[]> {
    try {
      const fs = require('fs').promises;
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {

      return [];
    }
  }

  private async write(cities: City[]): Promise<void> {
    try {
      const fs = require('fs').promises;
      await fs.writeFile(
        this.filePath,
        JSON.stringify(cities, null, 2),
        'utf8'
    );
  } catch (error) {
      throw new Error('Failed to write to history file');
  }
}
// TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
// async getCities() {}
async getCities(): Promise<City[]> {
  try {
    const cities = await this.read();
    return cities;
  } catch (error) {
    throw new Error('Failed to get cities from history');
  }
}
// TODO Define an addCity method that adds a city to the searchHistory.json file
// async addCity(city: string) {}
async addCity(cityName: string): Promise<City> {
  try {
    const cities = await this.read();
    const newCity = new City(cityName);

    //Add to beginning of array (most recent first) 
    cities.unshift(newCity);

    //Keep only the most recent 5 searches
    const limitedCities = cities.slice(0, 5);
    
    await this.write(limitedCities);
    return newCity;
  } catch (error) {
    throw new Error('Failed to add city to history');
  }
}

// * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
// async removeCity(id: string) {}
async removeCity(id: string): Promise<void> {
  try {
      let cities = await this.read();
      cities = cities.filter(city => city.id !== id);
      await this.write(cities);
    } catch (error) {
      throw new Error('Failed to remove city from history');
    }
  }
}

export default new HistoryService();

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

 


  

  
 
  


