import { WeatherGetQueries } from 'types/api-weather';

interface RegionData extends WeatherGetQueries {
  name: string;
}

export const INIT_REGION_DATA: RegionData[] = [
  { q: 'seoul', name: '서울' },
  { q: 'busan', name: '부산' },
  { q: 'daegu', name: '대구' },
  { q: 'incheon', name: '인천' },
  { q: 'gwangju', name: '광주' },
  { q: 'daejeon', name: '대전' },
  { q: 'ulsan', name: '울산' },
  { q: 'sejong', name: '세종' },
];

export default { INIT_REGION_DATA };
