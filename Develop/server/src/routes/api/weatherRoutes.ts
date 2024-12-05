import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
// router.post('/', (req: Request, res: Response) => {
router.post('/:city', async (req: Request, res: Response) => {
  try { 
  const cityName = req.params.city;

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const weatherData = await WeatherService.getWeatherByCityName(cityName);
    await HistoryService.saveSearch(cityName);
    res.json(weatherData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});
  // TODO: GET weather data from city name
router.get('/weather/:cityName', async (req: Request, res: Response) => {
  const { cityName } = req.params;

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const weatherData = await WeatherService.getWeatherByCityName(cityName);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

  // TODO: save city to search history

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});


export default router;
