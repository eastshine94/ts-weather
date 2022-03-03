/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchWeather } from 'services/weather-service';
import { INIT_REGION_DATA } from 'lib/constants';
import { WeatherGetQueries } from 'types/api-weather';
import { getSessionItem, setSessionItem } from '../lib/storage';

export default function Home() {
  const [regions, setRegions] = useState<typeof INIT_REGION_DATA>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = null;
  const queries: WeatherGetQueries = Array.from(searchParams.entries()).reduce(
    (acc, curr) => {
      const [key, value] = curr;
      return { ...acc, [key]: value };
    },
    {}
  );

  const handleRegionClick = (region: string) => {
    setSearchParams({ q: region });
  };

  const uqFetch = useQuery(['fetcher', params, queries], () =>
    fetchWeather({
      queries: {
        q: queries.q || 'seoul',
        ...queries,
      },
    })
  );

  const data = uqFetch?.data;

  useEffect(() => {
    const savedRegions = getSessionItem<typeof INIT_REGION_DATA>('regions');
    setRegions(savedRegions || INIT_REGION_DATA);
  }, []);

  return (
    <div>
      {!data ? (
        <div>
          <div>loading...</div>
        </div>
      ) : (
        <div className="flex">
          <div className="mr-4">
            {regions.map((region) => (
              <div
                key={region.name}
                onClick={() => {
                  handleRegionClick(region.q as string);
                }}
                className="cursor-pointer p-4 border border-orange-800"
              >
                {region.name}
              </div>
            ))}
          </div>
          <div>
            <InputArea regions={regions} setRegions={setRegions} />
            <div>현재 온도: {Math.round(data.main.temp - 273.15)} ℃</div>
            <div>현재 습도: {data.main.humidity}%</div>
            <div>풍속: {Math.round(data.wind.speed)}m/s</div>
            <div>구름: {data.clouds.all}%</div>
            <div>현재 날씨: {data.weather[0].main}</div>
            <div>날씨 설명: {data.weather[0].description}</div>
            <div>
              <img
                alt="날씨 아이콘"
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              />
            </div>
            <div>나라: {data.sys.country}</div>
            <div>도시: {data.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function InputArea({
  regions,
  setRegions,
}: {
  regions: typeof INIT_REGION_DATA;
  setRegions: React.Dispatch<React.SetStateAction<typeof INIT_REGION_DATA>>;
}) {
  const [q, setQ] = useState('');
  const [name, setName] = useState('');
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!q) {
      window.alert('q를 적어주세요.');
      return;
    }
    if (!name) {
      window.alert('name을 적어주세요');
      return;
    }
    try {
      await fetchWeather({
        queries: {
          q,
        },
      });
      const newRegions = [...regions, { q, name }];
      setSessionItem('regions', newRegions);
      setRegions(newRegions);
      setQ('');
      setName('');
    } catch (err) {
      window.alert('q가 잘못됨.');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="q">
        q:
        <input
          className="border border-black"
          name="q"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>
      <label htmlFor="name">
        name:
        <input
          className="border border-black"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">추가</button>
    </form>
  );
}
