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
                className={`text-sm p-1 px-2 rounded-lg cursor-pointer hover:bg-[#EFEFEE]
                    ${tag == null ? "text-teal-600 font-bold" : ""}`}
            >
                all
            </div>
            {tags &&
                tags.map((data: any, index: number) => (
                    <div
                        onClick={() => setTag(data.id)}
                        className={`text-sm p-1 px-2 rounded-lg cursor-pointer hover:bg-[#EFEFEE]
                    ${tag == data.id ? "text-teal-600 font-bold" : ""}`}
                        key={data.id}
                    >
                        {data.name}
                    </div>
                ))}
        </div>
    );
}
