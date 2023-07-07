type Props = {
    children: React.ReactNode;
};
import ConchImg from "@/components/ConchImg";
import Image from "next/image";
export default function SignLayout({ children }: Props) {
    //여기에 로그인 됐는지 확인하는 로직 작성하고 로그인 된 상태면 redirect 시키기

    return (
        <div className=" w-full flex flex-col justify-center items-center">
            {/* <Image className="w-auto h-auto" src="/images/conch.png" alt="소라고동 이미지" width={40} height={40} /> */}
            <ConchImg />
            <div className="w-96">{children}</div>
        </div>
    );
}
