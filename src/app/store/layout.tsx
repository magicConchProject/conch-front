"use client";

import useUser from "@/data/use-user";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import toast from "react-hot-toast";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
    const { loggedOut } = useUser();
    const router = useRouter();

    useLayoutEffect(() => {
        if (loggedOut == true) {
            router.push("/sign/signin");
            toast.error("회원 전용 기능입니다");
        }
    }, [loggedOut, router]);

    return (
        <div className="w-full flex-1 relative">
            <div className="absolute h-full overflow-auto w-full flex justify-center">{!loggedOut && children}</div>
        </div>
    );
}
