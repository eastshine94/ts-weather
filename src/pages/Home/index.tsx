/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchWeather } from 'services/weather-service';
import { INIT_REGION_DATA, RegionData } from 'lib/constants';
import { getSessionItem, removeSessionItem, setSessionItem } from 'lib/storage';
import { WeatherGetQueries } from 'types/api-weather';
import InputArea from './components/InputArea';
import RegionBox from './components/RegionBox';

export default function Home() {
  const ref = useRef(false);
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = null;
  const queries: WeatherGetQueries = Array.from(searchParams.entries()).reduce(
    (acc, curr) => {
      const [key, value] = curr;
      return { ...acc, [key]: value };
    },
    {}
  );

  const handleEditClick = (q: string, value: string) => {
    if (!value.trim()) {
      window.alert('1글자 이상 입력해야 합니다.');
      return;
    }
    const newRegions = regions.map((region) => {
      return region.q !== q ? region : { ...region, name: value };
    });
    setSessionItem('regions', newRegions);
    setRegions(newRegions);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const { q, name } = event.currentTarget.dataset;
    if (window.confirm(`${name as string}을(를) 삭제하시겠습니까?`)) {
      const newRegions = regions.filter((region) => region.q !== q);
      if (newRegions.length === 0) {
        removeSessionItem('regions');
      } else {
        setSessionItem('regions', newRegions);
      }

      setRegions(newRegions);
      if (q === queries.q) {
        setSearchParams({});
      }
    }
  };

  const uqFetch = useQuery(
    ['fetcher', params, queries],
    () =>
      fetchWeather({
        queries: {
          q: queries.q,
          ...queries,
        },
      }),
    { enabled: !!queries.q }
  );

  const data = uqFetch?.data;

  useEffect(() => {
    ref.current = true;
    const savedRegions = getSessionItem<RegionData[]>('regions');
    setRegions(savedRegions || INIT_REGION_DATA);
  }, []);

  return (
    <div>
      <div className="flex">
        <div className="mr-4 min-h-[30px] min-w-[60px]">
          {regions.map((region) => (
            <RegionBox
              key={region.q}
              region={region}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
        </div>

        <div>
          <InputArea regions={regions} setRegions={setRegions} />
          {!data ? (
            queries.q ? (
              <div>
                <div>loading...</div>
              </div>
            ) : (
              <div>
                {regions.length > 0
                  ? '지역을 선택해주세요.'
                  : '지역을 추가해주세요.'}
              </div>
            )
          ) : (
            <div className="border border-red-300 p-4">
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
              <div>
                도시: <span className="font-bold text-2xl">{data.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
