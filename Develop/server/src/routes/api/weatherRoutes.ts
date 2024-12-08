import { Router, Request, Response } from 'express';

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();
// TODO: POST Request with city name to retrieve weather data
// router.post('/', (req: Request, res: Response) => {
// TODO: GET weather data from city name
// TODO: save city to search history
router.get('/:city', async (req: Request, res: Response) => {
  try {
    const cityName = req.params.city;
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    if (typeof weatherData=== 'string') {
      res.status(404).json({ message: 'No cities found' });
    } else {
      // Ensures saved data has proper casing regardless of input
      await WeatherService.getWeatherForCity(cityName);
      await HistoryService.addCity(cityName);
      res.json(weatherData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// TODO: GET search history
router.get('/history', async (_: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving search history' });
  }
});

export default router;
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

// * BONUS TODO: DELETE city from search history
// OLD CODE: router.delete('/history/:id', async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     await HistoryService.removeCity(id);
//     res.status(200).json({ message: 'City deleted from search history' });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while deleting city from search history' });
//   }
// });


