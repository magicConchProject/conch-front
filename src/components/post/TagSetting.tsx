"use client";
import { useState } from "react";
import CustomButton from "../common/CustomButton";
import Modal from "../common/Modal";
import CustomInput from "../common/CustomInput";
import SubmitButton from "../common/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import useTag from "@/data/use-tag";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { addTag, deleteTag, editTag } from "@/api/tag";

export default function TagSetting() {
    const param = useParams();
    const [modalOpen, setModalOpen] = useState(false);

    const [modalAddOpen, setModalAddOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);

    const [selectedTag, setSelectedTag] = useState<{ name: string; id: number } | undefined>();

    const { tags, mutate } = useTag(Number(param.group));

    const { register: addRegister, handleSubmit: AddHandleSubmit } = useForm();
    const { register: editRegister, handleSubmit: EditHandleSubmit, setValue } = useForm();
    const addSubmit: SubmitHandler<any> = (data) => {
        toast
            .promise(addTag({ group_id: Number(param.group), name: data.name }), {
                loading: "Loading",
                success: () => "태그 생성 성공",
                error: (err) => `${err.toString()}`,
            })
            .then((res) => {
                mutate();
                setModalAddOpen(false);
                setModalOpen(true);
            });
    };

    const editSubmit: SubmitHandler<any> = (data) => {
        if (selectedTag?.id) {
            toast
                .promise(editTag(selectedTag.id, data.name), {
                    loading: "Loading",
                    success: () => "태그 수정 성공",
                    error: (err) => `${err.toString()}`,
                })
                .then((res) => {
                    mutate();
                    setModalAddOpen(false);
                    setModalOpen(true);
                });
        }
    };

    function deleteSubmit(data: any) {
        toast
            .promise(deleteTag(data.id), {
                loading: "Loading",
                success: () => "태그 삭제 성공",
                error: (err) => `${err.toString()}`,
            })
            .then((res) => {
                mutate();
            });
    }

    return (
        <>
            <CustomButton onClick={() => setModalOpen(true)} name="태그 관리" />

            {modalAddOpen && (
                <Modal open={modalAddOpen} setOpen={(open) => setModalAddOpen(open)} title="새 태그 만들기">
                    <form className="flex flex-col gap-3" onSubmit={AddHandleSubmit(addSubmit)}>
                        <CustomInput labelName="제목 입력" register={addRegister} label="name" />
                        <SubmitButton name="생성하기" />
                    </form>
                    <div className="flex justify-center pt-2  font-bold text-xs">
                        <button
                            onClick={() => {
                                setModalAddOpen(false);
                                setModalOpen(true);
                            }}
                        >
                            취소하기
                        </button>
                    </div>
                </Modal>
            )}

            {modalEditOpen && (
                <Modal open={modalEditOpen} setOpen={(open) => setModalEditOpen(open)} title="태그 수정하기">
                    <form className="flex flex-col gap-3" onSubmit={EditHandleSubmit(editSubmit)}>
                        <CustomInput
                            value={selectedTag?.name}
                            labelName="제목 입력"
                            register={editRegister}
                            label="name"
                            setValue={setValue}
                        />
                        <SubmitButton name="수정하기" />
                    </form>
                    <div className="flex justify-center pt-2  font-bold text-xs">
                        <button
                            onClick={() => {
                                setModalEditOpen(false);
                                setModalOpen(true);
                            }}
                        >
                            취소하기
                        </button>
                    </div>
                </Modal>
            )}

            {modalOpen && (
                <Modal open={modalOpen} setOpen={(open) => setModalOpen(open)} title="태그 관리">
                    <div className="flex justify-end mb-3 text-sm">
                        <button
                            onClick={() => {
                                setModalAddOpen(true);
                                setModalOpen(false);
                            }}
                        >
                            새 태그 추가하기
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {tags &&
                            tags.map((data: any, index: number) => (
                                <div className={`text-sm p-2 bg-neutral-100 rounded-lg flex justify-between`} key={data.id}>
                                    <div>{data.name}</div>
                                    <div className="flex gap-2 ">
                                        <button
                                            onClick={() => {
                                                setModalOpen(false);
                                                setModalEditOpen(true);
                                                setSelectedTag(data);
                                            }}
                                            className="text-xs"
                                        >
                                            edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                deleteSubmit(data);
                                            }}
                                            className="text-xs"
                                        >
                                            delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </Modal>
            )}
        </>
    );
}
