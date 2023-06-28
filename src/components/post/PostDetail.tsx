"use client";

import usePostDetail from "@/data/use-postDetail";
import { useParams, useRouter } from "next/navigation";
import HtmlViewer from "../common/HtmlViewer";
import moment from "moment";
import { useEffect } from "react";
import { deletePost, plusView } from "@/api/post";
import BackIcon from "../icons/BackIcon";
import Link from "next/link";
import toast from "react-hot-toast";

export default function PostDetail() {
    const router = useRouter();
    const params = useParams();
    const { post, mutate, loading, isEditable } = usePostDetail(params.post);
    //처음 여기 접근하면 조회수 +1 올리기
    useEffect(() => {
        plusView(Number(params.post)).then((res) => {
            mutate();
        });
    }, []);

    function thisDeletePost() {
        toast
            .promise(
                deletePost(Number(params.post)).catch((err) => {
                    throw new Error(err);
                }),
                {
                    loading: "Loading",
                    success: () => "포스트를 삭제했습니다",
                    error: (err) => `${err.toString()}`,
                }
            )
            .then((res) => {
                router.replace(`/post/${params.group}`);
            });
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            router.replace(`/post/${params.group}`);
                        }}
                    >
                        <BackIcon />
                    </button>
                    <h1 className="text-lg font-bold text-gray-600">돌아가기</h1>
                </div>
                {isEditable && (
                    <div className="flex gap-3 items-center">
                        <Link href={`/postedit/${params.group}/${params.post}`}>
                            <button className="text-yellow-500 hover:text-yellow-600 font-bold text-sm">수정하기</button>
                        </Link>
                        <button onClick={thisDeletePost} className="text-red-500 hover:text-red-600 font-bold text-sm">
                            삭제하기
                        </button>
                    </div>
                )}
            </div>
            <div className="bg-neutral-50 p-4 rounded-md flex flex-col gap-3 my-4">
                {!loading && (
                    <>
                        <section>
                            <h1 className="text-3xl px-3 font-bold text-gray-700 mb-3">{post.title}</h1>
                            <p className="px-3 text-gray-400 text-xs">작성자: {post.user.name}</p>
                            <p className="px-3 text-gray-400 text-xs">작성일: {moment(post.postDate).format("YYYY-MM-DD")}</p>
                            <p className="px-3 text-gray-400 text-xs">조회수: {post.views}</p>
                        </section>
                        <section className="border-2 rounded-md ">
                            <HtmlViewer text={post.contents} />
                        </section>
                    </>
                )}
            </div>
        </>
    );
}
