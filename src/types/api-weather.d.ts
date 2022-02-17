import { ApiResponse } from './common';

interface WeatherDetail {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export type WeatherGetParams = null;
export interface WeatherGetQueries {
  q?: string;
}

export interface WeatherGetPayload {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: WeatherDetail[];
  wind: {
    deg: number;
    speed: number;
  };
}

export type WeatherGetResponse = ApiResponse<WeatherGetPayload>;
