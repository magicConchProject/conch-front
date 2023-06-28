"use client";

import { useState } from "react";
import CustomButton from "../common/CustomButton";
import Modal from "../common/Modal";
import HtmlEditor from "../common/HtmlEditor";
import SubmitButton from "../common/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addComment } from "@/api/comment";
import { useParams } from "next/navigation";
import useComment from "@/data/use-comment";

export default function AddComment() {
    const [modalOpen, setModalOpen] = useState(false);
    const { register, handleSubmit } = useForm();

    const params = useParams();

    const post_id = params.post;

    const { mutate } = useComment(post_id);
    let htmlValue = "";
    function getChange(value: any) {
        if (value) htmlValue = value;
    }
    const submit: SubmitHandler<any> = (data) => {
        toast.promise(
            addComment({ comment: htmlValue, post_id }).then(() => {
                mutate();
                setModalOpen(false);
            }).catch((err) => {
                throw new Error(err)
            }),
            {
                loading: "Loading",
                success: () => "댓글 생성 성공",
                error: (err) => `${err.toString()}`,
            }
        );
    };

    return (
        <>
            <CustomButton onClick={() => setModalOpen(true)} name="댓글 추가" />

            {modalOpen && (
                <Modal open={modalOpen} setOpen={(open) => setModalOpen(open)} title="댓글 달기" maxWidth="max-w-[52rem]">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                        <HtmlEditor getChange={getChange} />
                        <SubmitButton name="등록하기" />
                    </form>
                </Modal>
            )}
        </>
    );
}
