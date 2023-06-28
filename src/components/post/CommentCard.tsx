"use client";

import moment from "moment";
import HtmlViewer from "../common/HtmlViewer";
import toast from "react-hot-toast";
import { deleteComment, editComment } from "@/api/comment";
import useComment from "@/data/use-comment";
import { useParams } from "next/navigation";
import { useState } from "react";
import Modal from "../common/Modal";
import HtmlEditor from "../common/HtmlEditor";
import SubmitButton from "../common/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
    comment: string;
    commentDate: Date;
    username: string;
    isEditable: boolean;
    commentid: number;
};

export default function CommentCard({ commentid, comment, commentDate, username, isEditable }: Props) {
    const params = useParams();

    const post_id = params.post;

    const { mutate } = useComment(post_id);

    const [modalOpen, setModalOpen] = useState(false);

    const { handleSubmit } = useForm();

    //내가 쓴 댓글 지우기
    function deleteMyComment(comment_id: number) {
        toast
            .promise(
                deleteComment(comment_id).catch((err) => {
                    throw new Error(err);
                }),
                {
                    loading: "Loading",
                    success: () => "댓글을 삭제했습니다",
                    error: (err) => `${err.toString()}`,
                }
            )
            .then((res) => {
                mutate();
            });
    }

    //내가 쓴 댓글 수정하기
    let htmlValue = "";
    function getChange(value: any) {
        if (value) htmlValue = value;
    }

    const submit: SubmitHandler<any> = () => {
        toast
            .promise(
                editComment(commentid, htmlValue).catch((err) => {
                    throw new Error(err);
                }),
                {
                    loading: "Loading",
                    success: () => "댓글을 수정했습니다",
                    error: (err) => `${err.toString()}`,
                }
            )
            .then((res) => {
                setModalOpen(false);
                mutate();
            });
    };

    return (
        <article className="rounded-md p-3 bg-neutral-50 flex items-center">
            <div className="flex-1">
                <section className="flex justify-between items-center">
                    <div>
                        <h1 className="font-bold mb-1">{username}</h1>
                        <p className="text-gray-400 text-xs">{moment(commentDate).format("YYYY-MM-DD")}</p>
                    </div>
                    {isEditable == true && (
                        <div className="flex gap-3">
                            <button onClick={() => setModalOpen(true)} className="text-yellow-500 hover:text-yellow-600 font-bold text-sm">
                                수정하기
                            </button>
                            <button
                                onClick={() => {
                                    deleteMyComment(commentid);
                                }}
                                className="text-red-500 hover:text-red-600 font-bold text-sm"
                            >
                                삭제하기
                            </button>
                        </div>
                    )}
                </section>

                <section className="border-2 rounded-md mt-3">
                    <HtmlViewer text={comment} />
                </section>
            </div>

            {modalOpen && (
                <Modal open={modalOpen} setOpen={(open) => setModalOpen(open)} title="댓글 달기" maxWidth="max-w-[52rem]">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                        <HtmlEditor getChange={getChange} content={comment} />
                        <SubmitButton name="수정하기" />
                    </form>
                </Modal>
            )}
        </article>
    );
}
