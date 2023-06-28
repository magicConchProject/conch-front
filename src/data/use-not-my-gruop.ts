import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useNotMyGroup() {
    const { data, mutate } = useSWR("/api/group/notMy", fetcher);

    const loading = !data;

    return {
        groups: data,
        mutate,
        loading,
    };
}
