"use client";
import { useState } from "react";
import CustomButton from "../common/CustomButton";
import Modal from "../common/Modal";
import CustomInput from "../common/CustomInput";
import SubmitButton from "../common/SubmitButton";
import useGroup from "@/data/use-group";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addGroup } from "@/api/group";
import useMyGroup from "@/data/use-my-group";

export default function AddGroup() {
    const [Modal1Open, setModal1Open] = useState(false);
    const { register, handleSubmit } = useForm();
    const { mutate } = useGroup();
    const myGroup = useMyGroup();

    const submit: SubmitHandler<any> = (data) => {
        toast
            .promise(addGroup(data), {
                loading: "Loading",
                success: () => "그룹 생성 성공",
                error: (err) => `${err.toString()}`,
            })
            .then(() => {
                mutate();
                myGroup.mutate();
                setModal1Open(false);
            });
    };

    return (
        <>
            <CustomButton onClick={() => setModal1Open(true)} name="새 그룹 만들기" />

            {Modal1Open && (
                <Modal open={Modal1Open} setOpen={(open) => setModal1Open(open)} title="새 그룹 만들기">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                        <CustomInput labelName="제목 입력" register={register} label="name" />

                        <SubmitButton name="생성하기" />
                    </form>
                </Modal>
            )}
        </>
    );
}
