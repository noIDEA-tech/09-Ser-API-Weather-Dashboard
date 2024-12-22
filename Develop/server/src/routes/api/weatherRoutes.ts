import { Router } from 'express';

// import { Router, type Request, type Response } from 'express';
import weatherService from '../../service/weatherService.js';
import historyService from '../../service/historyService.js';

const router = Router();
// const router = Router();

// TODO: POST Request with city name to retrieve weather data
// router.post('/', (req: Request, res: Response) => {
// TODO: GET weather data from city name
// TODO: save city to search history
router.post('/weather', async (req, res) => {
  try {
    const { cityName } = req.body;
    const weatherData = await weatherService.getWeatherForCity(cityName);
    await historyService.addToHistory(cityName); // Save to history
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

router.get('/weather/history', async (req, res) => {
  try {
    const history = await historyService.getHistory();
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});
// // * BONUS TODO: DELETE city from search history
router.delete('/weather/history/:id', async (req, res) => {
  try {
    await historyService.deleteFromHistory(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting from history:', error);
    res.status(500).json({ error: 'Failed to delete from history'});
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

// * BONUS TODO: DELETE city from search history


