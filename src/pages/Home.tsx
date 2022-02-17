import React, { useEffect } from 'react';
import { fetchWeather } from 'services/weather-service';

export default function Home() {
  // const [data, setData] = useState<any>();

  useEffect(() => {
    const fetch = async () => {
      const res = await fetchWeather({
        queries: { q: 'seoul' },
      });
      console.log(res);
    };

    void fetch();
  }, []);

  return (
    <div className="p-5 border border-red-400">
      <div>TEST</div>
    </div>
  );
}
