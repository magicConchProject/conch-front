"use client";

import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import useUser from "@/data/use-user";

import { PulseLoader } from "react-spinners";
import { signOutApi } from "@/api/user";

const menu = [
    { href: "/", name: "lab" },
    { href: "/post", name: "post" },
];

export default function Navbar() {
    const pathName = usePathname();
    const params = useParams();

    const { user, loading, loggedOut, mutate } = useUser();

    function signOut() {
        signOutApi().then(() => mutate());
    }

    return (
        <div className="flex justify-between items-center px-6 py-2">
            <section className="flex gap-5 items-center ">
                <div className="flex gap-1 items-center ">
                    {/* <Image className="w-auto h-auto" src="/images/conch.png" alt="소라고동 이미지" width={15} height={15} /> */}
                    <h1 className="font-bold text-lg">마법의 소라고동</h1>
                    <p className="text-xs">dev</p>
                </div>
                <nav>
                    <ul className="flex gap-4 items-center">
                        {menu.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className={`/${pathName.split("/")[1]}` === item.href ? "font-bold" : ""}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
            <section>
                <ul className="flex gap-2 items-center">
                    {loading ? (
                        <PulseLoader color="#b9b9b9" size={7} speedMultiplier={0.5} />
                    ) : loggedOut ? (
                        <>
                            <li>
                                <Link className="cursor-pointer text-xs text-gray-400" href="/sign/signup">
                                    회원가입
                                </Link>
                            </li>
                            <li>
                                <Link className="cursor-pointer text-xs text-gray-400" href="/sign/signin">
                                    로그인
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/mypage" className="cursor-pointer text-xs text-gray-500">
                                    <p className={pathName === "/mypage" ? "font-bold" : ""}>my page</p>
                                </Link>
                            </li>
                            <li className="font-bold text-yellow-500">{user.name}</li>

                            <li onClick={signOut} className="cursor-pointer text-xs text-gray-400">
                                <p>로그아웃</p>
                            </li>
                        </>
                    )}
                </ul>
            </section>
        </div>
    );
}
