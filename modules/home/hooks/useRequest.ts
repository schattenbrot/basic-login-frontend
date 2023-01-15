import useSWR from 'swr';
import ServerStatus from '../models/serverStatus';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useGetServerStatus = (path: string) => {
  if (!path) {
    throw new Error('path is required');
  }

  const url = baseURL + path;

  const { data, error } = useSWR<ServerStatus>(url, fetcher);

  return { data, error };
};
