import axios from 'axios';
import qs from 'qs';

const API_URL = 'https://api.openweathermap.org';

interface ApiArgs<TParams, TQueries> {
  endpoint: string;
  params?: TParams;
  queries?: TQueries;
}

function getReplaceUri<TParams, TQueries>({
  endpoint,
  params,
  queries,
}: ApiArgs<TParams, TQueries>) {
  console.log(params);
  const queriesToString = qs.stringify({
    ...queries,
    appid: process.env.REACT_APP_API_KEY || 'null',
  });

  return `${API_URL}${endpoint}?${queriesToString}`;
}

export function fetchFactory<TParams, TQueries, TResponse>({
  endpoint,
}: Pick<ApiArgs<TParams, TQueries>, 'endpoint'>) {
  return async ({
    params,
    queries,
  }: Omit<ApiArgs<TParams, TQueries>, 'endpoint'>) => {
    const replacedUri = getReplaceUri<TParams, TQueries>({
      endpoint,
      params,
      queries,
    });
    const { data } = await axios.get<TResponse>(replacedUri);

    return data;
  };
}

export default { fetchFactory };
