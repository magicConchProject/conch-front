"use client";

import { useState } from "react";
import CustomButton from "../common/CustomButton";
import Modal from "../common/Modal";
import HtmlEditor from "../common/HtmlEditor";
import CustomInput from "../common/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "../common/SubmitButton";
import { toast } from "react-hot-toast";
import { addPost } from "@/api/post";
import { useParams } from "next/navigation";
import usePost from "@/data/use-post";

export default function AddPost({page, limit} : {page: number, limit: number}) {
    const params = useParams();
    const group_id = params.group;

    const [modalOpen, setModalOpen] = useState(false);
    const { register, handleSubmit } = useForm();
    const { mutate } = usePost(group_id, page, limit);

    let htmlValue = "";
    function getChange(value: any) {
        if (value) htmlValue = value;
    }

    const submit: SubmitHandler<any> = (data) => {
        toast
            .promise(addPost({ ...data, contents: htmlValue, group_id }), {
                loading: "Loading",
                success: () => "포스팅 성공",
                error: (err) => `${err.toString()}`,
            })
            .then(() => {
                mutate();
                setModalOpen(false);
            });
    };

    return (
        <>
            <CustomButton onClick={() => setModalOpen(true)} name="새 포스트 작성" />

            {modalOpen && (
                <Modal open={modalOpen} setOpen={(open) => setModalOpen(open)} title="포스트 작성" maxWidth="max-w-[52rem]">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                        <CustomInput labelName="제목 입력" register={register} label="title" />
                        <HtmlEditor getChange={getChange} />
                        <SubmitButton name="등록하기" />
                    </form>
                </Modal>
            )}
        </>
    );
}
