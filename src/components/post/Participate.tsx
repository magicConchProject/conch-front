"use client";
import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import Modal from "../common/Modal";
import CustomInput from "../common/CustomInput";
import SubmitButton from "../common/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import SignButton from "../sign/SignButton";
import toast from "react-hot-toast";
import useGroup from "@/data/use-group";
import { participate, searchGroup } from "@/api/group";

export default function ParticipateButton() {
    //새 그룹 만들기 모달창용 state
    const [ModalOpen, setModalOpen] = useState<boolean>(false);
    //검색 결과 저장용 state
    const [mySearch, setMySearch] = useState<Array<any>>([]);
    //참여 그룹 선택
    const [selectedGroup, setSelectedGroup] = useState<Object | null>(null);
    //검색용 react-hook-form
    const { register, handleSubmit } = useForm();

    const { mutate } = useGroup();

    //그룹 검색 기능
    const submit: SubmitHandler<any> = (data) => {
        toast.promise(
            searchGroup(data).then((res) => {
                setMySearch(() => {
                    return [...res];
                });
            }).catch((err) => {
                throw new Error(err)
            }),
            {
                loading: "Loading",
                success: () => "검색 성공",
                error: (err) => `검색 실패`,
            }
        );
    };

    //group 선택
    const selectGroup = (data: any) => {
        setSelectedGroup(data);
    };

    //선택 그룹 저장
    const selectedGroupSubmit = () => {
        if (!selectedGroup) {
            return toast.error("선택된 그룹이 없습니다.");
        }
        toast
            .promise(participate(selectedGroup), {
                loading: "Loading",
                success: () => "그룹 참여 요청 성공",
                error: (err) => `오류 발생`,
            })
            .then((res) => {
                if (res.message == "success") {
                    setModalOpen(false);
                    mutate();
                }
            });
    };

    return (
        <>
            <div
                onClick={() => setModalOpen(true)}
                className="bg-slate-300 rounded-md p-2 mt-5 hover:bg-slate-400 cursor-pointer flex justify-center"
            >
                <PlusIcon />
            </div>

            <Modal open={ModalOpen} setOpen={(open) => setModalOpen(open)} title="그룹 참여하기">
                <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                    <div className="flex w-full gap-2 items-center">
                        <div className="flex-1">
                            <CustomInput register={register} label="name" />
                        </div>
                        <SubmitButton name="검색하기" />
                    </div>
                </form>
                <div className="my-3 flex flex-col gap-3">
                    {mySearch.length == 0 ? (
                        <div>결과 없음</div>
                    ) : (
                        mySearch.map((data, index) => {
                            return (
                                <div 
                                className={`${selectedGroup == data? 'bg-yellow-400 hover:bg-yellow-500': 'bg-neutral-200 hover:bg-neutral-300'} text-yellow-950 p-1 rounded-md text-sm cursor-pointer`}
                                onClick={() => selectGroup(data)} key={data.id}>
                                    {data.name}
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="flex flex-col">
                    <SignButton onClick={selectedGroupSubmit} buttonName="참여하기" />
                </div>
            </Modal>
        </>
    );
}
