import { Router, type Request, type Response } from 'express';
const router = Router();

import WeatherService from '../../service/weatherService.js';
import HistoryService from '../../service/historyService.js';
 
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
    const { cityName } = req.body;
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    res.json(weatherData);
  } catch (error) {
    console.error('Error in weather route:', error);
    res.status(500).json({ message: 'Unable to fetch weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Unable to fetch weather history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/weather/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await HistoryService.removeCity(id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting from history:', error);
    res.status(500).json({ message: 'Unable to delete from history' });
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

 

