import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useComment(postId: string) {
    const { data, mutate } = useSWR(`/api/comment/${postId}`, fetcher);

    const loading = !data;

    // console.log(data);
    return {
        comments: data,
        mutate,
        loading,
    };
}
