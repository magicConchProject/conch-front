import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useTag(groupId: number) {
    console.log(groupId);
    const { data, mutate } = useSWR(`/api/tag/${groupId}`, fetcher);

    const loading = !data;

    return {
        tags: data,
        loading,
        mutate,
    };
}
