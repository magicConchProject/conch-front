import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useMyGroup() {
    const { data, mutate } = useSWR("/api/group/my", fetcher);

    const loading = !data;

    return {
        groups: data,
        mutate,
        loading,
    };
}
