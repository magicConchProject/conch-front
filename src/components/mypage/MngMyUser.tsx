"use client";

import useMyUser from "@/data/use-my-user-info";
import { useState } from "react";
import Modal from "../common/Modal";
import CustomInput from "../common/CustomInput";
import SubmitButton from "../common/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { editUserName } from "@/api/user";
import useUser from "@/data/use-user";

export default function MngMyUser() {
    const { user, mutate } = useMyUser();
    const useuser = useUser();
    const [modalOpen, setModalOpen] = useState(false);
    const { register, handleSubmit, setValue } = useForm();

    const submit: SubmitHandler<any> = (submitdata) => {
        toast
            .promise(
                editUserName(submitdata.name).catch((err) => {
                    throw new Error(err);
                }),
                {
                    loading: "Loading",
                    success: () => "사용자 이름 변경 성공",
                    error: (err) => `${err.toString()}`,
                }
            )
            .then(() => {
                mutate();
                useuser.mutate();
                setModalOpen(false);
            });
    };

    return (
        <div className="bg-neutral-50 rounded-md p-2 flex justify-between items-center">
            <div>
                {user && (
                    <>
                        <h3 className="text-sm text-gray-600 ">email: {user.email}</h3>
                        <h3 className="text-sm text-gray-600 ">name: {user.name}</h3>
                    </>
                )}
            </div>
            <div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="text-yellow-500 p-1 rounded-md text-sm hover:text-yellow-600 font-bold"
                >
                    edit
                </button>
            </div>

            {modalOpen && (
                <Modal open={modalOpen} setOpen={(open) => setModalOpen(open)} title="이름 수정하기">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                        <CustomInput value={user.name} labelName="이름 입력" register={register} setValue={setValue} label="name" />

                        <SubmitButton name="수정하기" />
                    </form>
                </Modal>
            )}
        </div>
    );
}
