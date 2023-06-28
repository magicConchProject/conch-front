"use client";

import { addPost } from "@/api/post";
import CustomInput from "@/components/common/CustomInput";
import HtmlEditor from "@/components/common/HtmlEditor";
import SubmitButton from "@/components/common/SubmitButton";
import LayoutContainer from "@/components/containers/LayoutContainer";
import useGroup from "@/data/use-group";
import useTag from "@/data/use-tag";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export default function PostAdd() {
    //현재 파라미터 가져오기
    const params = useParams();
    const router = useRouter();
    const group_id = params.group;
    //react hook form 체크
    const { register, handleSubmit } = useForm();
    const { mutate } = useGroup();

    //html 에디터 변경 사항 체크
    let htmlValue = "";
    function getChange(value: any) {
        if (value) htmlValue = value;
    }
    const { tags } = useTag(Number(params.group));
    const [nowTag, setNowTag] = useState<number | null>(null);

    //제출 로직
    const submit: SubmitHandler<any> = (data) => {
        toast
            .promise(addPost({ ...data, contents: htmlValue, group_id, tag_id: nowTag }), {
                loading: "Loading",
                success: () => "포스팅 성공",
                error: (err) => `${err.toString()}`,
            })
            .then((res) => {
                mutate();
                router.replace(`/post/${group_id}/${res.id}`);
            });
    };

    return (
        <div className="bg-slate-200 w-full flex-1 relative">
            <div className="absolute h-full overflow-auto w-full flex justify-center">
                <LayoutContainer>
                    <div className="pb-2">
                        <div className="bg-white p-2 rounded-md">
                            <form className="flex flex-col gap-3" onSubmit={handleSubmit(submit)}>
                                <CustomInput labelName="제목 입력" register={register} label="title" />

                                <div>
                                    <label className="text-sm mb-1 text-gray-500">태그 지정</label>
                                    <div className="flex gap-2">
                                        <div
                                            onClick={() => setNowTag(null)}
                                            className={`text-sm p-1 px-2 rounded-lg ${
                                                nowTag == null ? "bg-neutral-600 text-neutral-50" : "bg-neutral-100"
                                            }`}
                                        >
                                            ALL
                                        </div>
                                        {tags &&
                                            tags.map((data: any, index: number) => (
                                                <div
                                                    onClick={() => setNowTag(data.id)}
                                                    className={`text-sm p-1 px-2 bg-neutral-100 rounded-lg 
                                                    ${nowTag == data.id ? "bg-neutral-600 text-neutral-50" : "bg-neutral-100"}`}
                                                    key={data.id}
                                                >
                                                    {data.name}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <HtmlEditor getChange={getChange} />
                                <SubmitButton name="등록하기" />
                            </form>
                        </div>
                    </div>
                </LayoutContainer>
            </div>
        </div>
    );
}
