import Navbar from "@/components/Navbar";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import Recoil from "@/components/recoil/Recoil";
import NavbarContainer from "@/components/containers/NavbarContainer";
import MyToaster from "@/components/common/MyToaster";
import Chakera from "@/components/Chakra";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
    title: "마법의 소라고동",
    description: "마법의 소라고동",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className={openSans.className}>
            <Recoil>
                <body className="w-full h-screen max-w-screen overflow-auto flex flex-col">
                    <MyToaster />
                    {/* 로그인, 회원가입 화면에서는 헤더 필요 없음 */}
                    <Chakera>
                        <NavbarContainer>
                            <header className="sticky top-0 bg-white z-10 ">
                                <Navbar />
                            </header>
                        </NavbarContainer>

                        <main className="flex-1 w-full flex justify-center">{children}</main>
                    </Chakera>
                </body>
            </Recoil>
        </html>
    );
}
