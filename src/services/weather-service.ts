import { fetchFactory } from 'lib/api-factory';
import * as Weather from 'types/api-weather';

// GET /data/2.5/weather
export const fetchWeather = fetchFactory<
  Weather.WeatherGetParams,
  Weather.WeatherGetQueries,
  Weather.WeatherGetResponse
>({
  endpoint: '/data/2.5/weather',
});

export default { fetchWeather };
