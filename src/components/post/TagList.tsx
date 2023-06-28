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
                className={`text-sm p-1 px-2 bg-neutral-100 rounded-lg 
                    ${tag == null ? "bg-neutral-600 text-neutral-50" : "bg-neutral-50"}`}
            >
                all
            </div>
            {tags &&
                tags.map((data: any, index: number) => (
                    <div
                        onClick={() => setTag(data.id)}
                        className={`text-sm p-1 px-2 bg-neutral-100 rounded-lg 
                    ${tag == data.id ? "bg-neutral-600 text-neutral-50" : "bg-neutral-50"}`}
                        key={data.id}
                    >
                        {data.name}
                    </div>
                ))}
        </div>
    );
}
