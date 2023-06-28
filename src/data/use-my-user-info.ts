import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useMyUser() {
    const { data, mutate } = useSWR(`/api/user/userinfo`, fetcher);

    const loading = !data;

    return {
        user: data,
        mutate,
        loading,
    };
}
