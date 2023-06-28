'use client'

import { deleteGroup, editGroupName } from "@/api/group";
import useMyGroup from "@/data/use-my-group"
import { useState } from "react";
import toast from "react-hot-toast";
import Modal from "../common/Modal";
import CustomInput from "../common/CustomInput";
import SubmitButton from "../common/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import useMyParticipation from "@/data/use-my-participation";
import Link from "next/link";

export default function MngMyGroup(){
  const {groups} = useMyGroup();

  return <div className="flex flex-col gap-3">
    {groups && groups.length > 0 ? groups.map((data: any, index: number) => {
        return (<div key={data.id}>
          <MngMyGroupCard data={data}/>
        </div>)
    }) : <div className="rounded-md text-gray-700 text-sm">내 그룹이 없습니다</div>}
  </div>
}

export function MngMyGroupCard(data: any) {
  const {mutate} = useMyGroup();
  const partticipation = useMyParticipation();
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit,setValue } = useForm();

  async function deleteThisGroup(groupId: number) {

    //그룹 삭제
    toast.promise(deleteGroup(groupId).catch((err) => {
      throw new Error(err)
    }), {
      loading: "Loading",
      success: () => "그룹을 삭제했습니다",
      error: (err) => `${err.toString()}`,
    }).then((res) => {
      mutate()
      partticipation.mutate()
    })
  }

  const submit: SubmitHandler<any> = (submitdata) => {
    toast
        .promise(editGroupName(data.data.id , submitdata).catch((err) => {
          throw new Error(err)
        }), {
            loading: "Loading",
            success: () => "그룹 수정 성공",
            error: (err) => `${err.toString()}`,
        })
        .then(() => {
            mutate();
            partticipation.mutate()
            setModalOpen(false);
        });
};

  return <div className="bg-neutral-50 rounded-md p-2 flex justify-between ">
    <div className="flex flex-col">
      <Link href="/mypage/group/mngGroup" className="font-bold text-lg text-gray-700">{data.data.name}</Link>
      <p className="text-sm text-gray-600 ">멤버 수: {data.data.memberCount}</p>
    </div>
    <div className="flex gap-2 items-center">
      <button onClick={() => setModalOpen(true)} className="text-yellow-500 p-1 rounded-md text-sm hover:text-yellow-600 font-bold">edit</button>
      <button onClick={()=> deleteThisGroup(data.data.id)} className="text-red-700 hover:text-red-800 p-1 rounded-md text-sm font-bold">delete</button>
    </div>

    {modalOpen && (
                <Modal open={modalOpen} setOpen={(open) => setModalOpen(open)} title="그룹 수정하기">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                        <CustomInput value={data.data.name}   labelName="제목 입력" register={register} setValue={setValue} label="name" />

                        <SubmitButton name="수정하기" />
                    </form>
                </Modal>
            )}
  </div>
}