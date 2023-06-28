"use client";

import { deletePost, editPost } from "@/api/post";
import useMyPost from "@/data/use-my-post";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
import Modal from "../common/Modal";
import CustomInput from "../common/CustomInput";
import HtmlEditor from "../common/HtmlEditor";
import SubmitButton from "../common/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import usePostDetail from "@/data/use-postDetail";
import useMyGroup from "@/data/use-my-group";
export default function MngMyPost() {
    const { groups } = useMyGroup();

    const [postOpen, setPostOpen] = useState(false);
    const [nowGroup, setNowGroup] = useState<number | undefined>(undefined);
    const { posts, mutate } = useMyPost(nowGroup);
    useEffect(() => {
        setPostOpen(false);
        setNowGroup(undefined);
    }, []);

    return (
        <>
            {postOpen ? (
                <div className="flex flex-col gap-3">
                    <div>
                        <button
                            className="text-gray-400 text-sm font-bold hover:text-gray-600"
                            onClick={() => {
                                setPostOpen(false);
                                setNowGroup(undefined);
                            }}
                        >
                            그룹 보기
                        </button>
                    </div>
                    {nowGroup && posts && posts.length > 0 ? (
                        posts.map((data: any, index: number) => {
                            return (
                                <div key={data.id}>
                                    <MngMyPostCard data={data} nowGroup={nowGroup} />
                                </div>
                            );
                        })
                    ) : (
                        <div className="rounded-md text-gray-700 text-sm">내 포스트가 없습니다</div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {groups && groups.length > 0 ? (
                        groups.map((data: any, index: number) => {
                            return (
                                <div key={data.id}>
                                    <div
                                        onClick={() => {
                                            setPostOpen(true);
                                            setNowGroup(data.id);
                                        }}
                                        className="bg-neutral-50 rounded-md p-2 flex justify-between "
                                    >
                                        <div className="flex flex-col">
                                            <h1 className="font-bold text-lg text-gray-700">{data.name}</h1>
                                            <p className="text-sm text-gray-600 ">멤버 수: {data.memberCount}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="rounded-md text-gray-700 text-sm">내 그룹이 없습니다</div>
                    )}
                </div>
            )}
        </>
    );
}

export function MngMyPostCard(data: any, nowGroup: number) {
    const [modalOpen, setModalOpen] = useState(false);
    const { mutate } = useMyPost(data.nowGroup);
    const { register, handleSubmit, setValue } = useForm();
    const [postDetail, setPostDetail] = useState<any>(undefined);

    async function mydeletePost(postId: number) {
        toast
            .promise(
                deletePost(postId).catch((err) => {
                    throw new Error(err);
                }),
                {
                    loading: "Loading",
                    success: () => "포스트를 삭제했습니다",
                    error: (err) => `${err.toString()}`,
                }
            )
            .then((res) => {
                mutate();
            });
    }

    const openModal = async (postId: number) => {
        const data = await fetch(`/api/post/postDetail/${postId}`)
            .then((res) => res.json())
            .then((res) => {
                return res;
            });
        setPostDetail(data);
        setModalOpen(true);
    };

    const submit: SubmitHandler<any> = (submitdata) => {
        toast
            .promise(
                editPost(postDetail.id, submitdata.title, htmlValue).catch((err) => {
                    throw new Error(err);
                }),
                {
                    loading: "Loading",
                    success: () => "포스트 수정 성공",
                    error: (err) => `${err.toString()}`,
                }
            )
            .then((res) => {
                mutate();
                setModalOpen(false);
            });
    };

    let htmlValue = "";
    function getChange(value: any) {
        if (value) htmlValue = value;
    }

    return (
        <div className="bg-neutral-50 rounded-md p-2 flex justify-between">
            <div>
                <h1 className="font-bold text-lg text-gray-700 ">{data.data.title}</h1>

                <p className="text-xs text-gray-600 ">그룹: {data.data.group.name}</p>
                <p className="text-xs text-gray-600 ">작성일: {moment(data.data.postDate).format("YYYY-MM-DD")}</p>
                <p className="text-xs text-gray-600 ">조회수: {data.data.views}</p>
            </div>
            <div className="flex gap-2 items-center">
                <button
                    onClick={() => openModal(data.data.id)}
                    className="text-yellow-500 p-1 rounded-md text-sm hover:text-yellow-600 font-bold"
                >
                    edit
                </button>
                <button
                    onClick={() => mydeletePost(data.data.id)}
                    className="text-red-700 hover:text-red-800 p-1 rounded-md text-sm font-bold"
                >
                    delete
                </button>
            </div>

            {modalOpen && postDetail && (
                <Modal open={modalOpen} setOpen={(open) => setModalOpen(open)} title="포스트 수정하기" maxWidth="max-w-[52rem]">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                        <CustomInput labelName="제목 입력" value={postDetail.title} register={register} label="title" setValue={setValue} />
                        <HtmlEditor getChange={getChange} content={postDetail.contents} />
                        <SubmitButton name="수정하기" />
                    </form>
                </Modal>
            )}
        </div>
    );
}
