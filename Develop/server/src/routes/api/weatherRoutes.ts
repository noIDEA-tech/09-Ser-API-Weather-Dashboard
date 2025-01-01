import { Router, type Request, type Response } from 'express';
import axios from 'axios';
// import WeatherService from '../../service/weatherService.js';
import HistoryService from '../../service/historyService.js';

const router = Router();
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
      const { cityName } = req.body;
      if (!cityName) {
          return res.status(400).json({ error: 'City name is required'})
      }

      const geoResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${OPENWEATHER_API_KEY}`  
      );

      if (!geoResponse.data[0]) {
          return res.status(400).json({ error: 'City is not found' });
      }

      const { lat, lon } = geoResponse.data[0];

      const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=imperial` 
      );

      await HistoryService.addCity(cityName);

      const formattedData = weatherResponse.data.list
      .filter((_: any, index: number) => index % 8 === 0) // Get one reading per day
      .map((item: any) => ({
        city: cityName,
        date: new Date(item.dt * 1000).toLocaleDateString(),
        icon: item.weather[0].icon,
        iconDescription: item.weather[0].description,
        tempF: Math.round(item.main.temp),
        windSpeed: Math.round(item.wind.speed),
        humidity: item.main.humidity
      }));

      res.json(formattedData);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// TODO: GET search history
  router.get('/history', async (req: Request, res: Response) => {
    try {
      const history = await HistoryService.getAllCities();
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch search history' });
    }
});

// * BONUS TODO: DELETE city from search history
  router.delete('/history/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await HistoryService.deleteCity(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete city' });
    }
  });


 
export default router;

// router.post('/', async (req: Request, res: Response) => {
//   const cityName = req.body.cityName;
//   if (!cityName) {
//     return res.status(400).json({ error: 'City name is required' });
//   }
  
//   try {
//     const weatherData = await weatherService.getWeatherForCity(cityName);
//     await historyService.addCity(cityName);
//     return res.json(weatherData);
//   } catch (error) {
//     return res.status(500).json({ error: 'Failed to retrieve weather data' });
//   }
// });
  
 
// const weatherServiceInstance = WeatherService;

// TODO: POST Request with city name to retrieve weather data

// router.post('/', async (req: Request, res: Response) => {
//   // OLD CODE: try {
  //   const { cityName } = req.body;
  //   if (!cityName) {
  //     return res.status(400).json({ error: 'City name is required' });
  //   }

    // TODO: Get weather data from city name
    // OLD CODE: const weatherData = await weatherServiceInstance.getWeatherForCity(cityName);

    // TODO: Save city to search history
  //  OLD CODE: await HistoryService.addCity(cityName);

  //   return res.status(200).json(weatherData);
  // } catch (error) {
  //   return res.status(500).json({ error: 'An error occurred while retrieving weather data' });
  
// // TODO: GET search history
// router.get('/history', async (req: Request, res: Response) => {
//  OLD CODE: console.log(req)
//   try {
//     const history = await HistoryService.getCities();
//     res.status(200).json(history);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while retrieving search history' });
//   }
// });

 

