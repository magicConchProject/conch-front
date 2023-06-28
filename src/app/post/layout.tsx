"use client";

import useUser from "@/data/use-user";
import { useEffect, useLayoutEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function PostLayout({ children }: { children: React.ReactNode }) {
    const { loggedOut } = useUser();
    const router = useRouter();

    useLayoutEffect(() => {
        if (loggedOut == true) {
            router.push("/sign/signin");
            toast.error("회원 전용 기능입니다");
        }
    }, [loggedOut, router]);

    return (
        <div className="bg-slate-200 w-full flex-1 relative">
            <div className="absolute h-full overflow-auto w-full flex justify-center">{!loggedOut && children}</div>
        </div>
    );
}
