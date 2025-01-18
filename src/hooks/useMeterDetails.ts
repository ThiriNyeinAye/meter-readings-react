import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Meter } from '../types/Meter';

const fetchMeterDetails = async (id: string): Promise<Meter> => {
  const response = await axios.get(`https://my-json-server.typicode.com/teeranank/meter/posts/${id}`);
  return response.data;
};

export const useMeterDetails = (id: string) => {
  return useQuery<Meter>({
    queryKey: ['meterDetails', id], 
    queryFn: () => fetchMeterDetails(id),
    enabled: !!id,
  });
};