"use client";
import Image from "next/image";
export default function ConchImg() {
    return <div><Image priority={true} className="w-auto h-auto" src="/images/conch.png" alt="소라고동 이미지" width={40} height={40} /></div>
}
