"use client";
import LayoutContainer from "@/components/containers/LayoutContainer";
import MyPageNav from "@/components/mypage/MyPageNav";
import useUser from "@/data/use-user";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import toast from "react-hot-toast";

export default function MyLayout({ children }: { children: React.ReactNode }) {
    const { user,loggedOut } = useUser();
    const router = useRouter();

    useLayoutEffect(() => {
        if (loggedOut == true) {
            router.push("/sign/signin");
            toast.error("회원 전용 기능입니다");
        }
    }, [loggedOut, router]);

    return (
        <div className="bg-slate-200 w-full relative">
            <div className="absolute h-full overflow-auto w-full flex justify-center">
                <LayoutContainer>
                <div className="flex gap-2 mb-3 items-center justify-between">
                    <h1 className="flex text-lg font-bold text-gray-600">
                        <p className="text-yellow-500">&quot;{user && user.name}&quot;</p> &nbsp;님의 마이페이지
                    </h1>
                </div>

                <MyPageNav />
                
                {!loggedOut && children}
                </LayoutContainer>
            </div>
        </div>
    );
}
