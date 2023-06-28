import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useMyPost(groupId?: number) {
    const { data, mutate } = useSWR(`/api/post/my/${groupId}`, fetcher);

    const loading = !data;

    return {
        posts: data,
        mutate,
        loading,
    };
}
