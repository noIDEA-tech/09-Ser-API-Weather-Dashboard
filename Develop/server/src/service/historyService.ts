import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';
// import path from 'node:path';
// import * as path from 'node:path';

// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }
}
// TODO: Complete the HistoryService class
class HistoryService {
    // private filePath: string;
  
    // constructor() {
    //   this.filePath = path.join(__dirname, 'db', 'searchHistory.json');
    // }
// TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile('/db/searchHistory.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
  }

// TODO: Define a write method that writes the updated cities array to the searchHistory.json file
// private async write(cities: City[]) {}
  private async write(cities: City[]) {
    return await fs.writeFile('db/searchHistory.json', JSON.stringify(cities, null, '\t'));
  }

// TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
// async getCities() {}
  async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: City[];

      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (err) {
        parsedCities = [];
      }

      return parsedCities;
    });
  }

// TODO Define an addCity method that adds a city to the searchHistory.json file
// async addCity(city: string) {}
  async addCity(city: string) {
    if (!city) {
      throw new Error('city cannot be blank');
    }

    const cities = await this.getCities();
    const newCity = new City(city);
    cities.push(newCity);
    await this.write(cities);
  }

// * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
// async removeCity(id: string) {}

  async removeCity(id: string) {
    const cities = await this.getCities();
    const filteredCities = cities.filter((city) => city.id !== id);
    await this.write(filteredCities);
  }
}

export default new HistoryService();

  

  
 
  


