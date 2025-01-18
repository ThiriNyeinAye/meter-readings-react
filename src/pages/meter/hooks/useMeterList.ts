import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchMeters = async () => {
  const response = await axios.get('https://my-json-server.typicode.com/teeranank/meter/posts');
  return response.data;
};

export const useMeterList = () => {
    return useQuery({
      queryKey: ['meterList'],
      queryFn: fetchMeters,
    });
  };
