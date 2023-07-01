"use client";

import { editPost } from "@/api/post";
import CustomInput from "@/components/common/CustomInput";
import HtmlEditor from "@/components/common/HtmlEditor";
import SubmitButton from "@/components/common/SubmitButton";
import LayoutContainer from "@/components/containers/LayoutContainer";
import usePostDetail from "@/data/use-postDetail";
import useTag from "@/data/use-tag";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function PostEdit() {
    const router = useRouter();
    const param = useParams();
    const { post, isEditable, mutate } = usePostDetail(param.post);

    const { tags } = useTag(Number(param.group));

    const [nowTag, setNowTag] = useState<number | null>(post?.tag?.id ? post.tag.id : null);
    //react hook form 체크
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (isEditable == false) {
            toast.error("포스트를 수정할 권한이 없습니다.");
            router.replace("/");
        }
    }, [isEditable, router]);

    //html 에디터 변경 사항 체크
    let htmlValue = "";
    function getChange(value: any) {
        if (value) htmlValue = value;
    }

    const submit: SubmitHandler<any> = (data) => {
        toast
            .promise(
                editPost(post.id, data.title, htmlValue, nowTag).catch((err) => {
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
                router.replace(`/post/${param.group}/${post.id}`);
            });
    };

    return (
        <div className="bg-slate-200 w-full flex-1 relative">
            <div className="absolute h-full overflow-auto w-full flex justify-center">
                <LayoutContainer>
                    <div className="pb-2">
                        <div className="bg-white p-2 rounded-md">
                            {post && (
                                <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                                    <CustomInput
                                        labelName="제목 입력"
                                        value={post.title}
                                        register={register}
                                        label="title"
                                        setValue={setValue}
                                    />
                                    <div>
                                        <label className="text-sm mb-1 text-gray-500">태그 지정</label>
                                        <div className="flex gap-2">
                                            <div
                                                onClick={() => setNowTag(null)}
                                                className={`text-sm p-1 px-2 rounded-lg ${
                                                    nowTag == null ? "bg-neutral-600 text-white" : "bg-neutral-100"
                                                }`}
                                            >
                                                ALL
                                            </div>
                                            {tags &&
                                                tags.map((data: any, index: number) => (
                                                    <div
                                                        onClick={() => setNowTag(data.id)}
                                                        className={`text-sm p-1 px-2 bg-neutral-100 rounded-lg 
                                                    ${nowTag == data.id ? "bg-neutral-600 text-white" : "bg-neutral-100"}`}
                                                        key={data.id}
                                                    >
                                                        {data.name}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    <HtmlEditor getChange={getChange} content={post.contents} />
                                    <SubmitButton name="수정하기" />
                                </form>
                            )}
                        </div>
                    </div>
                </LayoutContainer>
            </div>
        </div>
    );
}
