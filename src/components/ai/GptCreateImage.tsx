"use client";

import GptCreateImageAnswer from "./GptCreateImageAnswer";
import GptCreateImagSearchBox from "./GptCreateImageSearchBox";

export default function GptCreateImage() {
    return (
        <div className="flex flex-col flex-1 text-gray-850 text-base relative">
            <div className="absolute h-full w-full overflow-auto bg-[#bacee0]">
                <section className="w-full">
                    <GptCreateImagSearchBox />
                </section>
                <section className="w-full">
                    <GptCreateImageAnswer />
                </section>
            </div>
        </div>
    );
}
