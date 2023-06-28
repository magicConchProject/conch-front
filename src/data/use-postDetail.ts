import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function usePostDetail(postId: string) {
    const { data, mutate } = useSWR(`/api/post/postDetail/${postId}`, fetcher);

    const loading = !data;
    return {
        post: data?.post,
        isEditable: data?.isEditable,
        mutate,
        loading,
    };
}
