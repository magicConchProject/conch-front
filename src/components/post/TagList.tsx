"use client";

import useTag from "@/data/use-tag";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type Props = {
    tag: any;
    setTag: Dispatch<SetStateAction<number | null>>;
};

export default function TagList({ tag, setTag }: Props) {
    const param = useParams();

    const { tags } = useTag(Number(param.group));

    return (
        <div className="flex gap-2">
            <div
                onClick={() => setTag(null)}
                className={`text-sm p-1 px-2 bg-[#EFEFEE] rounded-lg cursor-pointer
                    ${tag == null ? "bg-teal-600 text-white" : "bg-[#EFEFEE]"}`}
            >
                all
            </div>
            {tags &&
                tags.map((data: any, index: number) => (
                    <div
                        onClick={() => setTag(data.id)}
                        className={`text-sm p-1 px-2 bg-[#EFEFEE] rounded-lg cursor-pointer
                    ${tag == data.id ? "bg-teal-600 text-white" : "bg-[#EFEFEE]"}`}
                        key={data.id}
                    >
                        {data.name}
                    </div>
                ))}
        </div>
    );
}
