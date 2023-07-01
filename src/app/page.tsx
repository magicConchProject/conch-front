"use client";
import SideNav from "@/components/SideNav";
import Bard from "@/components/ai/Bard";
import Gpt from "@/components/ai/Gpt";
import GptCreateImage from "@/components/ai/GptCreateImage";
import Introduce from "@/components/introduce/Introduce";
import { sideNavState } from "@/components/recoil/Recoil";
import { useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import { useRecoilValue } from "recoil";

export default function Home() {
    const nowMode = useRecoilValue(sideNavState);

    const [sideOpen, setSideOpen] = useState(false);

    return (
        <div className="flex w-full relative">
            {!sideOpen && <button onClick={() => setSideOpen(true)} className="absolute z-10 bg-white top-2 h-10 px-[2px] rounded-r-sm shadow-md"><HiChevronRight/></button>}
            <div onClick={() => setSideOpen(false)} className={`absolute bg-black left-0 h-full z-10 bg-opacity-25 ${sideOpen ? 'w-full' : 'w-0'}`}>
                <div onClick={(event) => event.stopPropagation()} 
                className={`w-[200px] h-full shadow-[4px_0_4px_-4px_rgba(0,0,0,0.3)] p-2 z-11 absolute bg-white ${sideOpen ? 'left-0 ' : 'left-[-200px] '} 
                ease-in-out transition-all duration-300`}>
                    <SideNav />
                </div>
            </div>

            {nowMode == 'introduce' && <Introduce/>}

            {nowMode == "bard" && <Bard />}
            {nowMode == "chat" && <Gpt />}
            {nowMode == "create-image" && <GptCreateImage />}
        </div>
    );
}
