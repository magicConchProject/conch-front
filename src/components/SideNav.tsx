"use client";

import { useRecoilState } from "recoil";
import { sideNavState } from "./recoil/Recoil";
import useUser from "@/data/use-user";
import ChatIcon from "./icons/ChatIcon";
import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";

export default function SideNav() {
    const [nowMode, setNowMode] = useRecoilState(sideNavState);
    const { loggedOut, user } = useUser();

    useLayoutEffect(() => {
        if (loggedOut == true) {
            setNowMode('introduce')
        } else {
            setNowMode('chat')
        }
    }, [loggedOut, setNowMode]);

    let menu =
        loggedOut == undefined || loggedOut || !user.premium
            ? [{mode: "introduce"}]
            : [
                    { mode: "open-ai", sub: [{ icon: <ChatIcon/>, mode: "chat" }] },
                ];

    return (
        <ul className="flex flex-col gap-2">
            {menu.map((data: any, index: number) => {
                return data.sub ? (
                    <li key={index} className={`p-1 rounded-sm font-bold`}>
                        {data.mode}
                        <ul className="flex flex-col gap-1 pt-2">
                            {data.sub.map((subdata: any, subindex: number) => {
                                return (
                                    <li
                                        onClick={() => setNowMode(subdata.mode)}
                                        key={`sub-${subindex}`}
                                        className={`${
                                            nowMode == subdata.mode ? "bg-gray-200" : ""
                                        } p-1 rounded-sm cursor-pointer font-medium flex items-center gap-1`}
                                    >
                                        {subdata.icon}
                                        {subdata.mode}
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                ) : (
                    <li
                        onClick={() => setNowMode(data.mode)}
                        key={index}
                        className={`${nowMode == data.mode ? "bg-gray-200" : ""} p-1 rounded-sm cursor-pointer`}
                    >
                        {data.mode}
                    </li>
                );
            })}
        </ul>
    );
}
