/* eslint-disable no-alert */
import React, { useState } from 'react';
import { INIT_REGION_DATA } from 'lib/constants';
import { fetchWeather } from 'services/weather-service';
import { setSessionItem } from 'lib/storage';

export default function InputArea({
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
    <form className="mb-4" onSubmit={handleSubmit}>
      <label htmlFor="q">
        q:
        <input
          className="border border-black"
          id="q"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>
      <label className="ml-4" htmlFor="name">
        name:
        <input
          className="border border-black"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button
        className="ml-4 px-2 border border-blue-600 bg-blue-200"
        type="submit"
      >
        추가
      </button>
    </form>
  );
}
