import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function usePost(
    groupId: string,
    page: number = 1,
    limit: number = 10,
    order: string = "postDate",
    searchOption: string = "title",
    search: string = "",
    tag: number | null = null
) {
    const { data, mutate } = useSWR(
        `/api/post/${groupId}?page=${page}&limit=${limit}&order=${order}&searchOption=${searchOption}&search=${search}&tag=${tag}`,
        fetcher
    );

    const loading = !data;
    // console.log(data)
    return {
        posts: data?.posts,
        total: data?.total,
        isManager: data?.isManager,
        group_name: data?.group?.name,
        mutate,
        loading,
    };
}
