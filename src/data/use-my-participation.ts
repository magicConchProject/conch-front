import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useMyParticipation() {
  const {data, mutate} = useSWR('/api/group/findParticipation', fetcher);
  const loading = !data;

  return {
    loading,
    mutate,
    data
  }
}