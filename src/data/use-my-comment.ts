import useSWR from 'swr';

export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function useMyComment() {
  const {data, mutate} = useSWR(`/api/comment/my`, fetcher);

  const loading = !data;

  return {
    comments: data,
    mutate,
    loading
  }
}