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
import { Card } from "@chakra-ui/react";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

export default function PostDetail() {
    const router = useRouter();
    const params = useParams();
    const { post, mutate, loading, isEditable } = usePostDetail(params.post);
    //처음 여기 접근하면 조회수 +1 올리기
    useEffect(() => {
        plusView(Number(params.post)).then((res) => {
            mutate();
        });
    }, [mutate, params.post]);

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
                </div>
                {isEditable && (
                    <div className="flex gap-3 items-center">
                        <Link href={`/postedit/${params.group}/${params.post}`} className="text-teal-600 hover:text-teal-700">
                            <EditIcon />
                        </Link>
                        <button onClick={thisDeletePost} className="text-gray-600 hover:text-gary-700 font-bold text-sm">
                            <DeleteIcon />
                        </button>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-3 my-4">
                {!loading && (
                    <>
                        {" "}
                        <section className="pb-5 border-b">
                            <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
                            <p className="text-gray-400 text-xs">작성자: {post.user.name}</p>
                            <p className="text-gray-400 text-xs">작성일: {moment(post.postDate).format("YYYY-MM-DD")}</p>
                            <p className="text-gray-400 text-xs">조회수: {post.views}</p>
                        </section>
                        <section>
                            <HtmlViewer text={post.contents} />
                        </section>
                    </>
                )}
            </div>
        </>
    );
}
