import useSWR from "swr";

export const fetcher = (url: string) =>
    fetch(url)
        .then((res) => res.json())


export default function useUser() {
    const { data, mutate } = useSWR("/api/user", fetcher);

    const loading = !data;
    const loggedOut = data && data.status === 403;
    
    return {
        loading,
        loggedOut,
        user: data,
        mutate,
    };
}
