"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const navButtonStyle = "flex-1 bg-neutral-200 hover:bg-neutral-300 rounded-md p-2 text-center text-neutral-400 font-bold text-sm cursor-pointer";
const selectednavButtonStyle = "flex-1 bg-yellow-400 hover:bg-yellow-500 rounded-md p-2 text-center text-yellow-900 font-bold text-sm cursor-pointer"

export default function MyPageNav() {
    const path = usePathname();
    const pattern = /^\/mypage\/group\/?/;
    return ( 
        <nav className="bg-neutral-50 rounded-md p-1 flex gap-2 mb-3">
            <Link href="/mypage" className={path == '/mypage' ? selectednavButtonStyle : navButtonStyle}>마이페이지</Link>
            <Link href="/mypage/group" className={pattern.test(path) ? selectednavButtonStyle : navButtonStyle}>그룹관리</Link>
            <Link href="/mypage/post"  className={path == '/mypage/post' ? selectednavButtonStyle : navButtonStyle}>포스트관리</Link>
            <Link href="/mypage/comment" className={path == '/mypage/comment' ? selectednavButtonStyle : navButtonStyle}>댓글관리</Link>
        </nav>
    );
}
