import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function ReactQueryTest() {
  // const [data, setData] = useState<any>();
  const fetcher = () => {
    return axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=${
        process.env.REACT_APP_API_KEY || 'kkk'
      }`
    );
  };

  const uqFetch = useQuery(['fetcher'], fetcher);

  if (!uqFetch.isSuccess) {
    return <div>loading....</div>;
  }
  console.log(uqFetch.data);
  return (
    <div className="p-5 border border-red-400">
      <div>TEST</div>
    </div>
  );
}
