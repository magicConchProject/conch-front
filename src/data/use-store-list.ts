import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useStoreList() {
    const { data, mutate } = useSWR("/api/chat-gpt-store", fetcher);

    const loading = !data;

    // console.log(data);
    return {
        loading,
        mutate,
        data,
    };
}
