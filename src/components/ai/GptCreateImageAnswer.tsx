"use client";

import { useRecoilValue } from "recoil";
import { gptImage } from "../recoil/Recoil";

export default function GptCreateImageAnswer() {
    const images = useRecoilValue(gptImage);
    return (
        <div className="p-2">
            <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {images &&
                    images.map((data: any, index: number) => (
                        <li key={index}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="w-[100%] h-auto rounded-md" src={data.url} alt="생성 이미지" />
                        </li>
                    ))}
            </ul>
        </div>
    );
}
