"use client";

import { OpenAiCreateImage } from "@/api/ai";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { gptImage } from "../recoil/Recoil";

export default function GptCreateImagSearchBox() {
    const { handleSubmit } = useForm();
    const [images, setImages] = useRecoilState<Array<any>>(gptImage);

    const [inputData, setInputData] = useState<any>({
        prompt: "",
        n: 1,
        size: "256x256",
    });

    const submit: SubmitHandler<any> = (data) => {
        toast.promise(
            OpenAiCreateImage(inputData.prompt, inputData.n, inputData.size)
                .then((res: any) => {
                    setImages(res.data);
                })
                .catch((err) => {
                    throw new Error(err);
                }),
            {
                loading: "Loading",
                success: () => "이미지 생성 성공",
                error: (err) => `${err.toString}`,
            }
        );
    };

    return (
        <div className="bg-neutral-50 p-3 shadow-[0_4px_4px_-4px_rgba(0,0,0,0.3)]">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(submit)}>
                <div className="flex flex-col gap-1">
                    <label className="font-bold text-sm">prompt</label>
                    <textarea
                        placeholder="한국어 입력하면 결과 이상하게 나옵니다. 영어로 입력하세요(ex, cute cat, one man)"
                        rows={3}
                        className="resize-none border-2 rounded-md"
                        onChange={(e) => {
                            setInputData((state: any) => {
                                return { ...state, prompt: e.target.value };
                            });
                        }}
                    ></textarea>
                </div>

                <div className="flex gap-2">
                    <article>
                        <label className="font-bold text-sm">number: </label>
                        <input
                            value={inputData["n"]}
                            onChange={(e) => {
                                setInputData((state: any) => {
                                    return { ...state, n: e.target.value };
                                });
                            }}
                            className="border-2 rounded-md"
                            type="number"
                            max="10"
                            min="1"
                        />
                    </article>
                    <article>
                        <label className="font-bold text-sm">size: </label>
                        <select
                            className="border-2 rounded-md"
                            name="size"
                            defaultValue="256x256"
                            onChange={(e) => {
                                setInputData((state: any) => {
                                    return { ...state, size: e.target.value };
                                });
                            }}
                        >
                            <option value="256x256">256x256</option>
                            <option value="512x512">512x512</option>
                            <option value="1024x1024">1024x1024</option>
                        </select>
                    </article>
                </div>

                <input
                    className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-md font-bold text-yellow-950 text-sm"
                    type="submit"
                    value="이미지 생성"
                />
            </form>
        </div>
    );
}
