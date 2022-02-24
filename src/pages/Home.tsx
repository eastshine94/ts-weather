import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchWeather } from 'services/weather-service';
import { INIT_REGION_DATA } from 'lib/constants';
import { WeatherGetQueries } from 'types/api-weather';

export default function Home() {
  const [searchParams] = useSearchParams();
  const queries: WeatherGetQueries = Array.from(searchParams.entries()).reduce(
    (acc, curr) => {
      const [key, value] = curr;
      return { ...acc, [key]: value };
    },
    {}
  );

  const uqFetch = useQuery(['fetcher'], () =>
    fetchWeather({
      queries: {
        q: 'seoul',
        ...queries,
      },
    })
  );

  const data = uqFetch?.data;

  console.log();
  return (
    <div>
      {!data ? (
        <div>
          <div>loading...</div>
        </div>
      ) : (
        <div className="flex">
          <div className="p-5 border border-red-400">
            {INIT_REGION_DATA.map((region) => (
              <div key={region.name}>{region.name}</div>
            ))}
          </div>
          <div>
            <div>base: {data.base}</div>
            <div>cod: {data.cod}</div>
            <div>coord.lat: {data.coord.lat}</div>
            <div>coord.lon: {data.coord.lon}</div>
            <div>dt: {data.dt}</div>
            <div>main.feels_like: {data.main.feels_like}</div>
            <div>main.humidity: {data.main.humidity}</div>
            <div>main.pressure: {data.main.pressure}</div>
            <div>main.temp: {data.main.temp}</div>
            <div>main.temp_max: {data.main.temp_max}</div>
            <div>main.temp_min: {data.main.temp_min}</div>
            <div>name: {data.name}</div>
            <div>sys.country: {data.sys.country}</div>
            <div>sys.sunrise: {data.sys.sunrise}</div>
            <div>sys.sunset: {data.sys.sunset}</div>
            <div>sys.type: {data.sys.type}</div>

            <div>weather[0].main: {data.weather[0].main}</div>
            <div>weather[0].description: {data.weather[0].description}</div>
            <div>weather[0].icon: {data.weather[0].icon}</div>
            <div>wind.deg: {data.wind.deg}</div>
            <div>wind.speed: {data.wind.speed}</div>
          </div>
        </div>
      )}
    </div>
  );
}
