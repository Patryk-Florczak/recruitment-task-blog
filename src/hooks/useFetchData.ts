import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

interface Props {
  queryKey: string;
  url: string;
  resourceId?: number;
}
const useFetchData = <Resource>({ queryKey, url, resourceId }: Props) => {
  const query = useQuery<Resource>({
    queryKey: [queryKey, resourceId],
    queryFn: () => axios.get(`${apiUrl}${url}`).then((response) => response.data)
  });

  return query;
};

export default useFetchData;
