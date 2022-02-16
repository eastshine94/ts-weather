import React, { useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  // const [data, setData] = useState<any>();

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=${
          process.env.REACT_APP_API_KEY || 'kkk'
        }`
      );
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
